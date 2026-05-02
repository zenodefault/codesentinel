import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify, parseArgs } from "node:util";
import { patchNodeManifest, patchPythonManifest } from "./manifest.mjs";
import { runBuildSimulation } from "./docker-sim.mjs";
import { checkLicenseChange } from "./license-check.mjs";
import { createPullRequest, createRef, getFile, getRef, parseRepoFullName, upsertFile } from "../integrations/github.mjs";
import { sendAutoFixFailureMessage, sendCveAlertMessage } from "../integrations/slack-notify.mjs";
import { sendWhatsAppApprovalRequest } from "../integrations/whatsapp-twilio.mjs";

const execFileAsync = promisify(execFile);

async function determineSafeVersionNpm(dependency) {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(dependency)}`);
  if (!response.ok) {
    throw new Error(`Unable to resolve npm metadata for ${dependency}`);
  }
  const json = await response.json();
  return json["dist-tags"]?.latest;
}

async function determineSafeVersionPip(dependency) {
  const response = await fetch(`https://pypi.org/pypi/${encodeURIComponent(dependency)}/json`);
  if (!response.ok) {
    throw new Error(`Unable to resolve PyPI metadata for ${dependency}`);
  }
  const json = await response.json();
  const versions = Object.keys(json.releases ?? {}).filter((v) => !/[ab]|rc/i.test(v));
  return versions.sort((a, b) => (a > b ? 1 : -1)).at(-1) ?? json.info?.version;
}

async function copyRepoToTemp(repoPath) {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "codesentinel-autofix-"));
  await execFileAsync("cp", ["-R", `${repoPath}/.`, tempRoot]);
  return tempRoot;
}

function encodeBase64(content) {
  return Buffer.from(content, "utf8").toString("base64");
}

async function createDraftFixPr({ fullRepoName, baseBranch, branchName, title, body, files, repoRoot }) {
  const { owner, repo } = parseRepoFullName(fullRepoName);
  const baseRef = await getRef(owner, repo, baseBranch);
  await createRef(owner, repo, branchName, baseRef.object.sha);

  for (const filePath of files) {
    const repoRelative = path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
    const content = await readFile(filePath, "utf8");
    const existing = await getFile(owner, repo, repoRelative, branchName);
    await upsertFile(
      owner,
      repo,
      repoRelative,
      `chore: auto-fix dependency in ${repoRelative}`,
      encodeBase64(content),
      branchName,
      existing?.sha ?? null,
    );
  }

  return createPullRequest(owner, repo, {
    title,
    head: branchName,
    base: baseBranch,
    body,
    draft: true,
  });
}

async function runCli() {
  const { values } = parseArgs({
    options: {
      repo: { type: "string", short: "r" },
      ecosystem: { type: "string" },
      dependency: { type: "string" },
      cve: { type: "string" },
      severity: { type: "string", default: "CRITICAL" },
      risk: { type: "string", default: "7" },
      "repo-full-name": { type: "string" },
      "base-branch": { type: "string", default: "main" },
      "tech-lead-whatsapp": { type: "string" },
    },
  });

  if (!values.repo || !values.dependency || !values.ecosystem || !values["repo-full-name"] || !values.cve) {
    throw new Error("--repo, --ecosystem, --dependency, --repo-full-name and --cve are required");
  }

  const tempRepo = await copyRepoToTemp(values.repo);

  try {
    const newVersion =
      values.ecosystem === "npm"
        ? await determineSafeVersionNpm(values.dependency)
        : await determineSafeVersionPip(values.dependency);

    const patchResult =
      values.ecosystem === "npm"
        ? await patchNodeManifest(tempRepo, values.dependency, `^${newVersion}`)
        : await patchPythonManifest(tempRepo, values.dependency, newVersion);

    if (values.ecosystem === "npm") {
      await execFileAsync("npm", ["install", "--package-lock-only"], { cwd: tempRepo });
      patchResult.changedFiles.push(path.join(tempRepo, "package-lock.json"));
    }

    const simulation = await runBuildSimulation({ ecosystem: patchResult.ecosystem, repoPath: tempRepo });

    if (!simulation.passed) {
      await sendAutoFixFailureMessage({
        repoName: values["repo-full-name"],
        dependency: values.dependency,
        cveId: values.cve,
        stderr: simulation.stderr || simulation.stdout,
      });

      console.log(
        JSON.stringify(
          {
            status: "simulation_failed",
            dependency: values.dependency,
            cveId: values.cve,
            simulation,
          },
          null,
          2,
        ),
      );
      return;
    }

    const licenseCheck = await checkLicenseChange({
      ecosystem: patchResult.ecosystem,
      dependency: values.dependency,
      oldVersion: patchResult.oldVersion,
      newVersion: patchResult.newVersion,
    });

    const branchName = `sentinel/fix-${values.dependency.replace(/[^a-zA-Z0-9._-]+/g, "-")}-${values.cve.toLowerCase()}`;
    const prTitle = `[CodeSentinel] Fix ${values.cve} in ${values.dependency}`;
    const prBody = [
      `CVE: ${values.cve}`,
      `Severity: ${values.severity}`,
      `Dependency: ${values.dependency}`,
      `Version change: ${patchResult.oldVersion} -> ${patchResult.newVersion}`,
      `Build simulation: PASSED`,
      `License: ${licenseCheck.oldLicense} -> ${licenseCheck.newLicense}`,
      licenseCheck.moreRestrictive ? "WARNING: license became more restrictive." : "License change warning: none.",
      `NVD link: https://nvd.nist.gov/vuln/search/results?query=${encodeURIComponent(values.cve)}`,
    ].join("\n");

    const pr = await createDraftFixPr({
      fullRepoName: values["repo-full-name"],
      baseBranch: values["base-branch"],
      branchName,
      title: prTitle,
      body: prBody,
      files: patchResult.changedFiles,
      repoRoot: tempRepo,
    });

    await sendCveAlertMessage({
      repoName: values["repo-full-name"],
      dependency: values.dependency,
      cveId: values.cve,
      actualRisk: Number(values.risk),
      severity: values.severity,
      prUrl: pr.html_url,
    });

    if (values["tech-lead-whatsapp"]) {
      await sendWhatsAppApprovalRequest({
        to: values["tech-lead-whatsapp"],
        cveId: values.cve,
        dependency: values.dependency,
        prNumber: pr.number,
        buildPassed: true,
        licenseWarning: licenseCheck.moreRestrictive,
      });
    }

    console.log(
      JSON.stringify(
        {
          status: "draft_pr_created",
          dependency: values.dependency,
          cveId: values.cve,
          oldVersion: patchResult.oldVersion,
          newVersion: patchResult.newVersion,
          simulation,
          licenseCheck,
          pullRequest: { number: pr.number, url: pr.html_url },
        },
        null,
        2,
      ),
    );
  } finally {
    await rm(tempRepo, { recursive: true, force: true });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await runCli();
}
