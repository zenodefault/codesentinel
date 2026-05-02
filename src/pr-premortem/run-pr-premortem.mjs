import { parseArgs } from "node:util";
import Anthropic from "@anthropic-ai/sdk";
import { readMemoryJson, getRepoMemoryPaths } from "../memory/memory.mjs";
import {
  createIssueComment,
  findExistingPremortemComment,
  listPullRequestFiles,
  parseRepoFullName,
  updateIssueComment,
} from "../integrations/github.mjs";
import { PREMORTEM_MARKER, buildPremortemMarkdown } from "./card.mjs";

function classifyRisk(blastRadiusCount, cveCount, ghostOwned) {
  const score = blastRadiusCount + cveCount * 3 + (ghostOwned ? 2 : 0);
  if (score >= 12) {
    return "CRITICAL";
  }
  if (score >= 7) {
    return "HIGH";
  }
  if (score >= 3) {
    return "MEDIUM";
  }
  return "LOW";
}

function lookupGhostAuthor(filePath, ghostAuthors) {
  return ghostAuthors.find((entry) => (entry.files ?? []).includes(filePath)) ?? null;
}

function cvesForFile(filePath, dependencyLedger) {
  const fileToDep = dependencyLedger.fileDependencyMap ?? {};
  const deps = fileToDep[filePath] ?? [];
  const depIndex = new Map((dependencyLedger.dependencies ?? []).map((dep) => [dep.name, dep]));
  const cves = [];

  for (const depName of deps) {
    const dep = depIndex.get(depName);
    if (!dep) {
      continue;
    }

    for (const advisory of dep.advisories ?? []) {
      if (advisory.cveId || advisory.id) {
        cves.push({
          dependency: depName,
          cveId: advisory.cveId ?? advisory.id,
        });
      }
    }
  }

  return cves;
}

async function generateWhatCouldGoWrong({ repoName, pullNumber, files, ghostOwned, cves }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const risky = files.filter((entry) => entry.riskLevel === "CRITICAL" || entry.riskLevel === "HIGH");
    if (risky.length === 0) {
      return "Low immediate regression risk; focus on test coverage for changed modules and dependency checks.";
    }
    return `Potential failures cluster around ${risky.map((entry) => entry.file).join(", ")} due to high coupling, known CVEs, and ownership gaps.`;
  }

  const client = new Anthropic({ apiKey });
  const prompt = [
    `Repository: ${repoName}`,
    `PR: #${pullNumber}`,
    "Generate a concise, constructive pre-mortem section titled implicitly as what could go wrong.",
    "Mention likely failure modes, user impact, and one mitigation theme.",
    `Files: ${JSON.stringify(files)}`,
    `Ghost-owned files: ${JSON.stringify(ghostOwned)}`,
    `CVEs in scope: ${JSON.stringify(cves)}`,
  ].join("\n");

  const response = await client.messages.create({
    model: process.env.CLAUDE_MODEL ?? "claude-sonnet-4-20250514",
    max_tokens: 220,
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content.find((entry) => entry.type === "text")?.text?.trim();
  return text || "Potential risk is concentrated in high blast-radius and vulnerable dependencies; reinforce tests and staged rollout.";
}

export async function generatePremortem({ repoName, fullRepoName, pullNumber, changedFiles }) {
  const repoPaths = getRepoMemoryPaths(repoName);
  const dependencyLedger = await readMemoryJson(repoPaths.dependencyLedger);
  const blastRadiusMap = await readMemoryJson(repoPaths.blastRadiusMap);
  const ghostAuthorsShared = await readMemoryJson(new URL("../../workspace/memory/ghost_authors.md", import.meta.url));

  const files = changedFiles.map((file) => {
    const impacted = blastRadiusMap.files?.[file]?.impactedBy ?? blastRadiusMap.files?.[file] ?? [];
    const ghost = lookupGhostAuthor(file, ghostAuthorsShared.ghostAuthors ?? []);
    const cves = cvesForFile(file, dependencyLedger);
    const riskLevel = classifyRisk(impacted.length, cves.length, Boolean(ghost));

    return {
      file,
      blastRadiusCount: impacted.length,
      riskLevel,
      cveIds: cves.map((entry) => entry.cveId),
      ghost,
      cves,
    };
  });

  const ghostOwned = files
    .filter((entry) => entry.ghost)
    .map((entry) => ({ file: entry.file, authorEmail: entry.ghost.email ?? entry.ghost.authorEmail ?? "unknown" }));
  const cves = files.flatMap((entry) => entry.cves.map((cve) => ({ file: entry.file, ...cve })));

  const summary =
    files.length === 0
      ? "No changed files were detected."
      : await generateWhatCouldGoWrong({ repoName, pullNumber, files, ghostOwned, cves });

  const markdown = buildPremortemMarkdown({
    repo: fullRepoName,
    prNumber: pullNumber,
    files,
    ghostOwned,
    cves,
    summary,
  });

  return { files, ghostOwned, cves, summary, markdown };
}

export async function postPremortemComment({ fullRepoName, pullNumber, markdown }) {
  const { owner, repo } = parseRepoFullName(fullRepoName);
  const existing = await findExistingPremortemComment(owner, repo, pullNumber, PREMORTEM_MARKER);

  if (existing) {
    const updated = await updateIssueComment(owner, repo, existing.id, markdown);
    return { action: "updated", commentId: updated.id };
  }

  const created = await createIssueComment(owner, repo, pullNumber, markdown);
  return { action: "created", commentId: created.id };
}

async function runCli() {
  const { values } = parseArgs({
    options: {
      repo: { type: "string", short: "r" },
      "repo-full-name": { type: "string" },
      pr: { type: "string" },
      files: { type: "string" },
      "fetch-from-github": { type: "boolean", default: false },
    },
  });

  if (!values.repo || !values["repo-full-name"] || !values.pr) {
    throw new Error("--repo, --repo-full-name and --pr are required");
  }

  let changedFiles = (values.files ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  if (values["fetch-from-github"]) {
    const { owner, repo } = parseRepoFullName(values["repo-full-name"]);
    const files = await listPullRequestFiles(owner, repo, Number(values.pr));
    changedFiles = files.map((entry) => entry.filename);
  }

  const premortem = await generatePremortem({
    repoName: values.repo,
    fullRepoName: values["repo-full-name"],
    pullNumber: Number(values.pr),
    changedFiles,
  });

  const posted = await postPremortemComment({
    fullRepoName: values["repo-full-name"],
    pullNumber: Number(values.pr),
    markdown: premortem.markdown,
  });

  console.log(
    JSON.stringify(
      {
        repo: values.repo,
        pullNumber: Number(values.pr),
        changedFiles,
        ...posted,
      },
      null,
      2,
    ),
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await runCli();
}
