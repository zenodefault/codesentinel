#!/usr/bin/env node
import { execFile } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { parseArgs } from "node:util";
import { intro, outro, select, text, spinner, isCancel, cancel, note, confirm } from "@clack/prompts";
import dotenv from "dotenv";
import { ensureMemoryStructure, getRepoMemoryPaths, listRegisteredRepos, readMemoryJson, readModulePassports, registerRepoPath } from "../memory/memory.mjs";
import { generateStandupReport } from "../orchestrator/standup.mjs";
import { identifyNewOnboardingContext, buildOnboardingMessage } from "../orchestrator/onboarding-buddy.mjs";
import { generatePremortem, postPremortemComment } from "../pr-premortem/run-pr-premortem.mjs";

const execFileAsync = promisify(execFile);
dotenv.config();

function printUsage() {
  console.log(`CodeSentinel CLI

Usage:
  codesentinel register [<repo_url_or_path>] [--max-dependencies 25]
  codesentinel scan [<repo_name>] [--max-dependencies 25]
  codesentinel why [<file_path>] [--repo /path/to/repo]
  codesentinel report [--notify] [--output ./reports]
  codesentinel ownership [--repo <repo_name>]
  codesentinel standup [--repo <repo_name>] [--days 1]
  codesentinel pr-premortem --repo <repo_name> --repo-full-name <org/repo> --pr <number> [--files <comma_files>]
  codesentinel onboard-buddy --repo <repo_name> --author <name_or_email> --files <comma_files>
  codesentinel onboard
  codesentinel repos

Interactive mode:
  Run any command without arguments in a terminal to be guided through the process.
`);
}

function parseRepoName(repoInput) {
  const trimmed = repoInput.trim().replace(/\/+$/, "");
  const last = trimmed.split("/").pop() ?? trimmed;
  return last.endsWith(".git") ? last.slice(0, -4) : last;
}

function isLocalPath(repoInput) {
  return !/^(https?:\/\/|git@|ssh:\/\/)/.test(repoInput);
}

async function runJsonCommand(args) {
  const { stdout } = await execFileAsync("node", args, { cwd: process.cwd() });
  const jsonStart = stdout.indexOf("{");
  if (jsonStart < 0) {
    throw new Error(`No JSON output from command: node ${args.join(" ")}`);
  }
  return JSON.parse(stdout.slice(jsonStart));
}

async function findFirstTrackedFile(repoName) {
  const paths = await getRepoMemoryPaths(repoName);
  const blast = await readMemoryJson(paths.blastRadiusMap);
  return Object.keys(blast.files ?? {}).sort()[0] ?? null;
}

async function cmdRegister(positionals, values) {
  let repoInput = positionals[0];

  if (!repoInput && process.stdin.isTTY) {
    intro("CodeSentinel Registration");
    repoInput = await text({
      message: "Which repository would you like to register?",
      placeholder: "GitHub URL or local filesystem path",
    });

    if (isCancel(repoInput)) {
      cancel("Registration cancelled.");
      process.exit(0);
    }
  }

  if (!repoInput) {
    throw new Error("register requires <repo_url_or_path>");
  }

  const repoName = parseRepoName(repoInput);
  
  let useInRepo = values["in-repo"];
  if (!useInRepo && process.stdin.isTTY && !values["non-interactive"]) {
    useInRepo = await confirm({
      message: `Store Durable Memory inside ${repoName} for team sharing? (.codesentinel folder)`,
      initialValue: true,
    });
    
    if (isCancel(useInRepo)) {
      cancel("Registration cancelled.");
      process.exit(0);
    }
  }

  if (isLocalPath(repoInput)) {
    await registerRepoPath(repoName, repoInput);
    if (useInRepo) {
      const inRepoPath = path.join(path.resolve(repoInput), ".codesentinel");
      await mkdir(inRepoPath, { recursive: true });
    }
  } else {
    await registerRepoPath(repoName, process.cwd());
  }

  const s = process.stdin.isTTY ? spinner() : null;
  if (s) s.start(`Registering ${repoName} and performing initial scan...`);

  await ensureMemoryStructure(repoName);

  const cveResult = await runJsonCommand([
    "./src/cve-sweep/run-cve-sweep.mjs",
    "--repo",
    repoInput,
    "--repo-name",
    repoName,
    "--max-dependencies",
    String(values["max-dependencies"] ?? 25),
  ]);

  let archaeology = null;
  if (isLocalPath(repoInput)) {
    const firstFile = await findFirstTrackedFile(repoName);
    if (firstFile) {
      archaeology = await runJsonCommand([
        "./src/git-archaeologist/run-git-archaeologist.mjs",
        "--repo",
        repoInput,
        "--file",
        firstFile,
      ]);
    }
  }

  if (s) s.stop(`Registration complete for ${repoName}.`);

  const repoPaths = await getRepoMemoryPaths(repoName);
  const ledger = await readMemoryJson(repoPaths.dependencyLedger);

  if (process.stdin.isTTY && !values.json) {
    const depCount = ledger.dependencies?.length ?? cveResult.dependencyCount;
    const criticalCount = ledger.alerts?.criticalDependencies?.length ?? 0;
    
    note(`Repository ${repoName} is now registered in Durable Memory.\nSource: ${repoInput}`, "Registration Successful");
    note(`Found ${depCount} dependencies and ${criticalCount} critical issues.`, "Initial Scan Summary");
    if (archaeology) {
      note(`Git archaeology bootstrapped using ${archaeology.filePath}.`, "Archaeology Status");
    }
    outro("Registration complete.");
  } else {
    console.log(
      JSON.stringify(
        {
          command: "register",
          repoName,
          source: repoInput,
          dependencies: ledger.dependencies?.length ?? cveResult.dependencyCount,
          critical: ledger.alerts?.criticalDependencies?.length ?? 0,
          archaeologyBootstrapped: Boolean(archaeology),
        },
        null,
        2,
      ),
    );
  }
}

async function cmdScan(positionals, values) {
  let repoName = positionals[0];
  const registered = await listRegisteredRepos();

  if (!repoName && process.stdin.isTTY) {
    intro("CodeSentinel Dependency Scan");
    repoName = await select({
      message: "Which repository would you like to scan?",
      options: registered.map((repo) => ({ value: repo, label: repo })),
    });

    if (isCancel(repoName)) {
      cancel("Scan cancelled.");
      process.exit(0);
    }
  }

  if (!repoName) {
    throw new Error("scan requires <repo_name>");
  }

  if (!registered.includes(repoName)) {
    throw new Error(`Repo ${repoName} is not registered in Durable Memory.`);
  }

  const s = process.stdin.isTTY ? spinner() : null;
  if (s) s.start(`Scanning dependencies for ${repoName}...`);

  const repoPaths = await getRepoMemoryPaths(repoName);
  const ledger = await readMemoryJson(repoPaths.dependencyLedger);
  const sourceInput = ledger.source?.input ?? path.dirname(ledger.manifest?.path ?? "");
  if (!sourceInput) {
    if (s) s.stop("Scan failed.");
    throw new Error(`Repo ${repoName} has no source input in memory.`);
  }

  const scan = await runJsonCommand([
    "./src/cve-sweep/run-cve-sweep.mjs",
    "--repo",
    sourceInput,
    "--repo-name",
    repoName,
    "--max-dependencies",
    String(values["max-dependencies"] ?? 25),
  ]);

  if (s) s.stop(`Scan complete for ${repoName}.`);

  if (process.stdin.isTTY && !values.json) {
    const critical = scan.alerts?.length ?? 0;
    note(`Found ${scan.dependencyCount} dependencies (${scan.directDependencyCount} direct).`, `Scan Results: ${repoName}`);
    if (critical > 0) {
      note(`${critical} critical alerts identified. Review with 'npm run cli -- report'.`, "Alerts");
    } else {
      note("No critical alerts found.", "Alerts");
    }
    outro("Scan complete.");
  } else {
    console.log(
      JSON.stringify(
        {
          command: "scan",
          repoName,
          dependencyCount: scan.dependencyCount,
          directDependencyCount: scan.directDependencyCount,
          criticalAlerts: scan.alerts?.length ?? 0,
        },
        null,
        2,
      ),
    );
  }
}

async function cmdWhy(positionals, values) {
  let filePath = positionals[0];

  if (!filePath && process.stdin.isTTY) {
    intro("CodeSentinel Archaeologist");
    filePath = await text({
      message: "Which file do you want to investigate?",
      placeholder: "e.g., src/index.js",
    });

    if (isCancel(filePath)) {
      cancel("Investigation cancelled.");
      process.exit(0);
    }
  }

  if (!filePath) {
    throw new Error("why requires <file_path>");
  }

  const repoRoot = path.resolve(values.repo ?? process.cwd());
  
  const s = process.stdin.isTTY ? spinner() : null;
  if (s) s.start(`Digging through git history for ${filePath}...`);

  const result = await runJsonCommand([
    "./src/git-archaeologist/run-git-archaeologist.mjs",
    "--repo",
    repoRoot,
    "--file",
    filePath,
  ]);

  if (s) s.stop(`Analysis complete for ${filePath}.`);

  const passport = result.modulePassport?.content ?? result.modulePassport;

  if (process.stdin.isTTY && !values.json) {
    const summary = passport?.riskSummary || "No summary available.";
    const ownerLabel = passport?.ownership?.primaryOwner?.label || "Unmapped";
    const teamLabel = passport?.ownership?.likelyTeam?.name || "Unassigned";
    const ghostCount = passport?.ghostAuthors?.length || 0;
    const ghostRisk = result.ghostOwnershipRisk || "LOW";
    
    note(summary, `Risk Summary: ${result.filePath}`);
    
    const details = `Owner: ${ownerLabel}\nTeam: ${teamLabel}\nCommits: ${result.commitCount}\nGhost Authors: ${ghostCount} (Risk: ${ghostRisk})`;
    note(details, "Module Metadata");
    
    if (result.modulePassport?.path) {
      note(`Full passport saved to: ${result.modulePassport.path}`, "Passport Artifact");
    }
    
    outro("Investigation complete.");
  } else {
    console.log(
      JSON.stringify(
        {
          command: "why",
          repoName: result.repoName,
          filePath: result.filePath,
          commitCount: result.commitCount,
          ghostOwnershipRisk: result.ghostOwnershipRisk,
          passportPath: result.modulePassport?.path ?? null,
        },
        null,
        2,
      ),
    );
  }
}

async function cmdReport(values) {
  const isInteractive = process.stdin.isTTY && !values.json;
  if (isInteractive) {
    intro("CodeSentinel Weekly Report");
  }

  const s = isInteractive ? spinner() : null;
  if (s) s.start("Generating comprehensive weekly security and ownership report...");

  const args = ["./src/reports/run-weekly-report.mjs", "--output", values.output ?? "reports"];
  if (values.notify) {
    args.push("--notify");
  }

  const report = await runJsonCommand(args);
  
  if (s) s.stop("Report generation complete.");

  if (isInteractive) {
    note(`Report saved to: ${report.outputPath}`, "Report Location");
    note(`Analyzed ${report.report?.repoCount || 0} repositories.\nFound ${report.report?.counts?.CRITICAL || 0} critical issues.`, "Summary");
    if (report.slack?.sent) {
      note("The report has been uploaded to Slack.", "Notification");
    }
    outro("Report ready.");
  } else {
    console.log(
      JSON.stringify(
        {
          command: "report",
          outputPath: report.outputPath,
          repoCount: report.report?.repoCount,
          criticalCount: report.report?.counts?.CRITICAL,
          slackSent: report.slack?.sent,
        },
        null,
        2,
      ),
    );
  }
}

async function cmdRepos() {
  const repos = await listRegisteredRepos();
  if (process.stdin.isTTY) {
    intro("Registered Repositories");
    note(repos.join("\n") || "No repositories registered yet.", "Inventory");
    outro("Use 'register' to add more.");
  } else {
    console.log(JSON.stringify({ command: "repos", repos }, null, 2));
  }
}

async function cmdOwnership(rest, values) {
  let repoName = values.repo;
  const registered = await listRegisteredRepos();

  if (!repoName && process.stdin.isTTY) {
    intro("CodeSentinel Ownership Audit");
    repoName = await select({
      message: "Which repository would you like to audit? (Select 'All' to scan everything)",
      options: [
        { value: "all", label: "All Repositories" },
        ...registered.map((repo) => ({ value: repo, label: repo })),
      ],
    });

    if (isCancel(repoName)) {
      cancel("Audit cancelled.");
      process.exit(0);
    }
    if (repoName === "all") repoName = null;
  }

  let repos = [];
  if (repoName) {
    if (!registered.includes(repoName)) {
      throw new Error(`Repo ${repoName} is not registered.`);
    }
    repos = [repoName];
  } else {
    repos = registered;
  }

  const s = process.stdin.isTTY ? spinner() : null;
  if (s) s.start(`Auditing ownership across ${repos.length} repos...`);

  const unclearModules = [];

  for (const repo of repos) {
    const passports = await readModulePassports(repo);
    for (const passport of passports) {
      const isUnmapped = !passport.ownership?.primaryOwner?.label || passport.ownership.primaryOwner.label === "Unmapped";
      const isUnassigned = !passport.ownership?.likelyTeam?.name || passport.ownership.likelyTeam.name === "Unassigned";
      const hasGhostAuthors = (passport.ghostAuthors?.length ?? 0) > 0;

      if (isUnmapped || isUnassigned || hasGhostAuthors) {
        unclearModules.push({
          repo,
          module: passport.module,
          owner: passport.ownership?.primaryOwner?.label ?? "Unmapped",
          team: passport.ownership?.likelyTeam?.name ?? "Unassigned",
          ghostAuthors: passport.ghostAuthors?.length ?? 0,
          ghostOwnershipRisk: passport.ghostOwnershipRisk ?? "LOW",
        });
      }
    }
  }

  if (s) s.stop("Ownership audit complete.");

  if (process.stdin.isTTY && !values.json) {
    if (unclearModules.length === 0) {
      note("No modules with unclear ownership found. Great job!", "Ownership Audit");
    } else {
      const list = unclearModules.slice(0, 10).map((m) => `• ${m.repo}: ${m.module} (${m.owner})`).join("\n");
      const overflow = unclearModules.length > 10 ? `\n...and ${unclearModules.length - 10} more.` : "";
      note(`${list}${overflow}`, `Unclear Ownership: ${unclearModules.length} modules found`);
      note("Run with --json to see the full list.", "Pro Tip");
    }
    outro("Audit complete.");
  } else {
    console.log(
      JSON.stringify(
        {
          command: "ownership",
          unclearModules,
          summary: {
            totalUnclear: unclearModules.length,
            reposScanned: repos.length,
          },
        },
        null,
        2,
      ),
    );
  }
}

async function cmdStandup(values) {
  let repoName = values.repo;
  const registered = await listRegisteredRepos();

  if (!repoName && process.stdin.isTTY) {
    intro("CodeSentinel Daily Impact Standup");
    repoName = await select({
      message: "Which repository would you like to summarize?",
      options: registered.map((repo) => ({ value: repo, label: repo })),
    });

    if (isCancel(repoName)) {
      cancel("Standup cancelled.");
      process.exit(0);
    }
  }

  if (!repoName) {
    throw new Error("standup requires --repo or an interactive selection.");
  }

  const s = process.stdin.isTTY ? spinner() : null;
  if (s) s.start(`Mining git history and analyzing impact for ${repoName}...`);

  const memory = await getRepoMemoryPaths(repoName);
  const repoPath = memory.repoRoot.protocol === "file:" ? memory.repoRoot.pathname : process.cwd();

  const report = await generateStandupReport({
    repoName,
    repoPath,
    days: Number(values.days ?? 1),
  });

  if (s) s.stop("Impact analysis complete.");

  if (!report) {
    note("No commits found in the specified time period.", "Standup Summary");
    return;
  }

  if (process.stdin.isTTY && !values.json) {
    console.log(report.aiSummary);
    outro("Standup complete.");
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
}

async function cmdPrPremortem(values) {
  if (!values.repo || !values["repo-full-name"] || !values.pr) {
    throw new Error("pr-premortem requires --repo, --repo-full-name and --pr");
  }

  const s = process.stdin.isTTY ? spinner() : null;
  if (s) s.start(`Generating risk assessment for PR #${values.pr}...`);

  const changedFiles = (values.files ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  const premortem = await generatePremortem({
    repoName: values.repo,
    fullRepoName: values["repo-full-name"],
    pullNumber: Number(values.pr),
    changedFiles,
  });

  if (s) s.stop("Assessment complete.");

  if (process.stdin.isTTY && !values.json) {
    console.log(premortem.markdown);
    outro("Pre-mortem ready.");
  } else {
    console.log(JSON.stringify(premortem, null, 2));
  }
}

async function cmdOnboardBuddy(values) {
  if (!values.repo || !values.author || !values.files) {
    throw new Error("onboard-buddy requires --repo, --author and --files");
  }

  const s = process.stdin.isTTY ? spinner() : null;
  if (s) s.start(`Identifying onboarding context for ${values.author}...`);

  const changedFiles = values.files
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  const contexts = await identifyNewOnboardingContext({
    repoName: values.repo,
    authorEmail: values.author,
    authorLogin: values.author,
    changedFiles,
  });

  if (s) s.stop("Search complete.");

  if (contexts.length === 0) {
    note("No new module contexts identified for this author.", "Onboarding Buddy");
    return;
  }

  const message = buildOnboardingMessage(contexts);

  if (process.stdin.isTTY && !values.json) {
    console.log(message);
    outro("Onboarding context generated.");
  } else {
    console.log(JSON.stringify({ contexts, message }, null, 2));
  }
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function checkCommand(command, args = ["--version"]) {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, { cwd: process.cwd() });
    return { ok: true, output: (stdout || stderr || "").trim() };
  } catch (error) {
    return { ok: false, output: error.message };
  }
}

function requiredEnvStatus(names) {
  return names.map((name) => ({ name, present: Boolean(process.env[name]) }));
}

function getConfiguredLlmProvider() {
  return (process.env.CODESENTINEL_LLM_PROVIDER ?? "").trim().toLowerCase();
}

function getLlmEnvChecks(provider) {
  if (provider === "anthropic") {
    return requiredEnvStatus(["ANTHROPIC_API_KEY"]);
  }
  if (provider === "openai") {
    return requiredEnvStatus(["OPENAI_API_KEY"]);
  }
  if (provider === "google") {
    return requiredEnvStatus(["GOOGLE_API_KEY"]);
  }
  if (provider === "openrouter") {
    return requiredEnvStatus(["OPENROUTER_API_KEY"]);
  }
  if (provider === "qwen") {
    return requiredEnvStatus(["QWEN_API_KEY"]);
  }
  return [];
}

function getOptionalLlmEnvForProvider(provider) {
  if (provider === "anthropic") {
    return ["ANTHROPIC_MODEL"];
  }
  if (provider === "openai") {
    return ["OPENAI_MODEL"];
  }
  if (provider === "google") {
    return ["GOOGLE_MODEL"];
  }
  if (provider === "qwen") {
    return ["QWEN_MODEL", "QWEN_BASE_URL"];
  }
  if (provider === "openrouter") {
    return ["OPENROUTER_MODEL"];
  }
  return [];
}

function parseEnvFile(raw) {
  const map = new Map();
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) {
      continue;
    }
    const eq = line.indexOf("=");
    if (eq <= 0) {
      continue;
    }
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim();
    map.set(key, value);
  }
  return map;
}

function quoteEnvValue(value) {
  if (/^[A-Za-z0-9_./:-]+$/.test(value)) {
    return value;
  }
  return `"${String(value).replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}"`;
}

async function upsertEnvValues(filePath, entries) {
  let raw = "";
  try {
    raw = await readFile(filePath, "utf8");
  } catch {
    raw = "";
  }

  const lines = raw ? raw.split(/\r?\n/) : [];
  const byKey = new Map(entries.map((entry) => [entry.key, entry.value]));
  const seen = new Set();
  const out = [];

  for (const line of lines) {
    const eq = line.indexOf("=");
    if (eq > 0) {
      const key = line.slice(0, eq).trim();
      if (byKey.has(key)) {
        out.push(`${key}=${quoteEnvValue(byKey.get(key))}`);
        seen.add(key);
        continue;
      }
    }
    out.push(line);
  }

  for (const [key, value] of byKey.entries()) {
    if (!seen.has(key)) {
      out.push(`${key}=${quoteEnvValue(value)}`);
    }
  }

  const normalized = out.join("\n").replace(/\n*$/, "\n");
  await writeFile(filePath, normalized, "utf8");
}

async function promptForEnv(missingEnv) {
  if (!process.stdin.isTTY) {
    return { collected: [], skipped: missingEnv };
  }

  const labels = {
    ANTHROPIC_API_KEY: "Anthropic API Key",
    ANTHROPIC_MODEL: "Anthropic model override (optional)",
    OPENAI_API_KEY: "OpenAI API Key",
    OPENAI_MODEL: "OpenAI model override (optional)",
    OPENROUTER_API_KEY: "OpenRouter API Key",
    OPENROUTER_MODEL: "OpenRouter model override (optional)",
    QWEN_API_KEY: "Qwen API Key",
    QWEN_MODEL: "Qwen model override (optional)",
    QWEN_BASE_URL: "Qwen Base URL (optional)",
    GOOGLE_API_KEY: "Google AI API Key",
    GOOGLE_MODEL: "Google model override (optional)",
    SLACK_SIGNING_SECRET: "Slack Signing Secret",
    SLACK_BOT_TOKEN: "Slack Bot Token",
    SLACK_WEBHOOK_URL: "Slack Incoming Webhook URL",
    SLACK_CHANNEL_ID: "Slack Channel ID",
    GITHUB_TOKEN: "GitHub Token",
    GITHUB_WEBHOOK_SECRET: "GitHub Webhook Secret",
    TWILIO_ACCOUNT_SID: "Twilio Account SID",
    TWILIO_AUTH_TOKEN: "Twilio Auth Token",
    TWILIO_WHATSAPP_FROM: "Twilio WhatsApp From (e.g. whatsapp:+14155238886)",
  };

  const collected = [];
  const skipped = [];

  for (const key of missingEnv) {
    const label = labels[key] ?? key;
    const answer = await text({
      message: `${label}:`,
      placeholder: "leave empty to skip",
    });

    if (isCancel(answer)) {
      cancel("Onboarding cancelled.");
      process.exit(0);
    }

    const trimmed = answer.trim();
    if (!trimmed || trimmed.toLowerCase() === "skip") {
      skipped.push(key);
      continue;
    }

    collected.push({ key, value: trimmed });
    process.env[key] = trimmed;
  }

  return { collected, skipped };
}

async function promptForLlmProvider() {
  if (!process.stdin.isTTY) {
    return { provider: null, skipped: true };
  }

  const selection = await select({
    message: "Choose an LLM provider for CodeSentinel:",
    options: [
      { value: "anthropic", label: "Anthropic" },
      { value: "openai", label: "OpenAI" },
      { value: "google", label: "Google" },
      { value: "openrouter", label: "OpenRouter" },
      { value: "qwen", label: "Qwen" },
      { value: "skip", label: "Skip (configure later)" },
    ],
  });

  if (isCancel(selection)) {
    cancel("Onboarding cancelled.");
    process.exit(0);
  }

  if (selection === "skip") {
    return { provider: null, skipped: true };
  }

  return { provider: selection, skipped: false };
}

async function cmdOnboard(values) {
  const isInteractive = !values["non-interactive"] && process.stdin.isTTY;

  if (isInteractive) {
    intro("CodeSentinel Onboarding");
  }

  const cwd = process.cwd();
  const envFile = path.join(cwd, ".env");
  const existingEnv = parseEnvFile(
    await readFile(envFile, "utf8").catch(() => ""),
  );
  for (const [key, value] of existingEnv.entries()) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  const s = isInteractive ? spinner() : null;
  if (s) s.start("Checking workspace and tools...");

  const files = {
    soul: path.join(cwd, "workspace", "SOUL.md"),
    heartbeat: path.join(cwd, "workspace", "HEARTBEAT.md"),
    memorySchema: path.join(cwd, "workspace", "memory", "SCHEMA.md"),
    cveSkill: path.join(cwd, "skills", "cve-sweep", "SKILL.md"),
    archaeologySkill: path.join(cwd, "skills", "git-archaeologist", "SKILL.md"),
    premortemSkill: path.join(cwd, "skills", "pr-premortem", "SKILL.md"),
    autofixSkill: path.join(cwd, "skills", "auto-fix", "SKILL.md"),
    rotReportSkill: path.join(cwd, "skills", "rot-report", "SKILL.md"),
  };

  const fileChecks = await Promise.all(
    Object.entries(files).map(async ([key, filePath]) => ({
      key,
      path: filePath,
      ok: await pathExists(filePath),
    })),
  );

  const toolChecks = {
    node: {
      ok: Number(process.versions.node.split(".")[0]) >= 22,
      output: process.versions.node,
    },
    docker: await checkCommand("docker", ["--version"]),
    python3: await checkCommand("python3", ["--version"]),
  };

  if (s) s.stop("Workspace checks complete.");

  const envChecks = {
    slack: requiredEnvStatus(["SLACK_SIGNING_SECRET", "SLACK_BOT_TOKEN", "SLACK_WEBHOOK_URL", "SLACK_CHANNEL_ID"]),
    github: requiredEnvStatus(["GITHUB_TOKEN", "GITHUB_WEBHOOK_SECRET"]),
    twilio: requiredEnvStatus(["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_FROM"]),
    llmProvider: requiredEnvStatus(["CODESENTINEL_LLM_PROVIDER"]),
    llm: getLlmEnvChecks(getConfiguredLlmProvider()),
  };

  const missingEnv = Object.values(envChecks)
    .flat()
    .filter((entry) => !entry.present)
    .map((entry) => entry.name);

  let onboardingCapture = {
    prompted: false,
    wroteEnvFile: false,
    collected: [],
    skipped: [],
    llmProvider: getConfiguredLlmProvider() || null,
  };

  const collectedEntries = [];
  const skippedKeys = [];

  if (isInteractive && !getConfiguredLlmProvider()) {
    onboardingCapture.prompted = true;
    const selection = await promptForLlmProvider();
    if (selection.provider) {
      process.env.CODESENTINEL_LLM_PROVIDER = selection.provider;
      collectedEntries.push({ key: "CODESENTINEL_LLM_PROVIDER", value: selection.provider });
      onboardingCapture.llmProvider = selection.provider;
    } else if (selection.skipped) {
      skippedKeys.push("CODESENTINEL_LLM_PROVIDER");
    }
  }

  const currentMissingEnv = [
    ...Object.values({
      slack: requiredEnvStatus(["SLACK_SIGNING_SECRET", "SLACK_BOT_TOKEN", "SLACK_WEBHOOK_URL", "SLACK_CHANNEL_ID"]),
      github: requiredEnvStatus(["GITHUB_TOKEN", "GITHUB_WEBHOOK_SECRET"]),
      twilio: requiredEnvStatus(["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_FROM"]),
      llm: getLlmEnvChecks(getConfiguredLlmProvider()),
    })
      .flat()
      .filter((entry) => !entry.present)
      .map((entry) => entry.name),
  ];

  if (currentMissingEnv.length > 0 && isInteractive) {
    onboardingCapture.prompted = true;
    const prompted = await promptForEnv(currentMissingEnv);
    collectedEntries.push(...prompted.collected);
    skippedKeys.push(...prompted.skipped);
  }

  const optionalLlmEnv = getOptionalLlmEnvForProvider(getConfiguredLlmProvider())
    .filter((key) => !process.env[key]);
  if (optionalLlmEnv.length > 0 && isInteractive) {
    onboardingCapture.prompted = true;
    note("Optional LLM settings: you can keep the defaults or customize them.");
    const prompted = await promptForEnv(optionalLlmEnv);
    collectedEntries.push(...prompted.collected);
    skippedKeys.push(...prompted.skipped);
  }

  onboardingCapture.collected = [...new Set(collectedEntries.map((entry) => entry.key))];
  onboardingCapture.skipped = [...new Set(skippedKeys)];
  if (collectedEntries.length > 0) {
    await upsertEnvValues(envFile, collectedEntries);
    onboardingCapture.wroteEnvFile = true;
  }

  const refreshedEnvChecks = {
    slack: requiredEnvStatus(["SLACK_SIGNING_SECRET", "SLACK_BOT_TOKEN", "SLACK_WEBHOOK_URL", "SLACK_CHANNEL_ID"]),
    github: requiredEnvStatus(["GITHUB_TOKEN", "GITHUB_WEBHOOK_SECRET"]),
    twilio: requiredEnvStatus(["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_FROM"]),
    llmProvider: requiredEnvStatus(["CODESENTINEL_LLM_PROVIDER"]),
    llm: getLlmEnvChecks(getConfiguredLlmProvider()),
  };

  const remainingMissingEnv = Object.values(refreshedEnvChecks)
    .flat()
    .filter((entry) => !entry.present)
    .map((entry) => entry.name);

  const failedFiles = fileChecks.filter((entry) => !entry.ok).map((entry) => entry.path);
  const failedTools = Object.entries(toolChecks)
    .filter(([, value]) => !value.ok)
    .map(([key]) => key);

  const ok = remainingMissingEnv.length === 0 && failedFiles.length === 0 && failedTools.length === 0;

  const nextSteps = [];
  if (failedTools.includes("node")) {
    nextSteps.push("Install Node.js >= 22.");
  }
  if (failedTools.includes("docker")) {
    nextSteps.push("Install Docker and ensure `docker --version` works.");
  }
  if (failedFiles.length > 0) {
    nextSteps.push("Restore missing OpenClaw project files listed in `missingFiles`.");
  }
  if (remainingMissingEnv.length > 0) {
    if (values["non-interactive"]) {
      nextSteps.push("Set missing environment variables manually or rerun `codesentinel onboard` without --non-interactive.");
    } else {
      nextSteps.push("Fill remaining skipped/missing environment variables by rerunning `codesentinel onboard`.");
    }
  }
  if (!getConfiguredLlmProvider()) {
    nextSteps.push("Choose an LLM provider by rerunning `codesentinel onboard` or setting `CODESENTINEL_LLM_PROVIDER` manually.");
  }
  if (ok) {
    nextSteps.push("Run `npm run server:start` and `npm run webhooks:start` in separate terminals.");
    nextSteps.push("Register a repo via `npm run cli -- register <repo_path_or_url>`.");
  }

  if (isInteractive) {
    if (ok) {
      outro("Onboarding successful! Ready to guard your repos.");
    } else {
      outro("Onboarding incomplete. See next steps below.");
    }
  }

  console.log(
    JSON.stringify(
      {
        command: "onboard",
        ok,
        checks: {
          files: fileChecks,
          tools: toolChecks,
          env: refreshedEnvChecks,
        },
        onboardingCapture,
        missingFiles: failedFiles,
        missingEnv: remainingMissingEnv,
        failedTools,
        nextSteps,
      },
      null,
      2,
    ),
  );
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      repo: { type: "string" },
      "repo-full-name": { type: "string" },
      pr: { type: "string" },
      author: { type: "string" },
      files: { type: "string" },
      days: { type: "string", default: "1" },
      "in-repo": { type: "boolean", default: false },
      output: { type: "string", default: "reports" },
      notify: { type: "boolean", default: false },
      "max-dependencies": { type: "string", default: "25" },
      "non-interactive": { type: "boolean", default: false },
      json: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  if (values.help || positionals.length === 0) {
    printUsage();
    return;
  }

  const [command, ...rest] = positionals;

  if (command === "register") {
    await cmdRegister(rest, values);
    return;
  }

  if (command === "scan") {
    await cmdScan(rest, values);
    return;
  }

  if (command === "why") {
    await cmdWhy(rest, values);
    return;
  }

  if (command === "report") {
    await cmdReport(values);
    return;
  }

  if (command === "repos") {
    await cmdRepos();
    return;
  }

  if (command === "ownership") {
    await cmdOwnership(rest, values);
    return;
  }

  if (command === "standup") {
    await cmdStandup(values);
    return;
  }

  if (command === "pr-premortem") {
    await cmdPrPremortem(values);
    return;
  }

  if (command === "onboard-buddy") {
    await cmdOnboardBuddy(values);
    return;
  }

  if (command === "onboard") {
    await cmdOnboard(values);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: error.message }, null, 2));
  process.exitCode = 1;
});
