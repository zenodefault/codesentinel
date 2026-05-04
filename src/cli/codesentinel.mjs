#!/usr/bin/env node
import { execFile } from "node:child_process";
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { parseArgs } from "node:util";
import { intro, outro, select, text, spinner, isCancel, cancel, note } from "@clack/prompts";
import dotenv from "dotenv";
import { ensureMemoryStructure, getRepoMemoryPaths, listRegisteredRepos, readMemoryJson, readModulePassports } from "../memory/memory.mjs";

const execFileAsync = promisify(execFile);
dotenv.config();

function printUsage() {
  console.log(`CodeSentinel CLI

Usage:
  codesentinel register <repo_url_or_path> [--max-dependencies 25]
  codesentinel scan <repo_name> [--max-dependencies 25]
  codesentinel why <file_path> [--repo /path/to/repo]
  codesentinel report [--notify] [--output ./reports]
  codesentinel onboard [--non-interactive]
  codesentinel ownership [--repo <repo_name>]
  codesentinel repos
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
  const blastPath = getRepoMemoryPaths(repoName).blastRadiusMap;
  const blast = await readMemoryJson(blastPath);
  return Object.keys(blast.files ?? {}).sort()[0] ?? null;
}

async function cmdRegister(positionals, values) {
  const repoInput = positionals[0];
  if (!repoInput) {
    throw new Error("register requires <repo_url_or_path>");
  }

  const repoName = parseRepoName(repoInput);
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

  const ledger = await readMemoryJson(getRepoMemoryPaths(repoName).dependencyLedger);
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

async function cmdScan(positionals, values) {
  const repoName = positionals[0];
  if (!repoName) {
    throw new Error("scan requires <repo_name>");
  }

  const repos = await listRegisteredRepos();
  if (!repos.includes(repoName)) {
    throw new Error(`Repo ${repoName} is not registered in Durable Memory.`);
  }

  const ledger = await readMemoryJson(getRepoMemoryPaths(repoName).dependencyLedger);
  const sourceInput = ledger.source?.input ?? path.dirname(ledger.manifest?.path ?? "");
  if (!sourceInput) {
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

async function cmdWhy(positionals, values) {
  const filePath = positionals[0];
  if (!filePath) {
    throw new Error("why requires <file_path>");
  }

  const repoRoot = path.resolve(values.repo ?? process.cwd());
  const result = await runJsonCommand([
    "./src/git-archaeologist/run-git-archaeologist.mjs",
    "--repo",
    repoRoot,
    "--file",
    filePath,
  ]);

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

async function cmdReport(values) {
  const args = ["./src/reports/run-weekly-report.mjs", "--output", values.output ?? "reports"];
  if (values.notify) {
    args.push("--notify");
  }

  const report = await runJsonCommand(args);
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

async function cmdRepos() {
  const repos = await listRegisteredRepos();
  console.log(JSON.stringify({ command: "repos", repos }, null, 2));
}

async function cmdOwnership(rest, values) {
  const repoName = values.repo;
  let repos = [];

  if (repoName) {
    const registered = await listRegisteredRepos();
    if (!registered.includes(repoName)) {
      throw new Error(`Repo ${repoName} is not registered.`);
    }
    repos = [repoName];
  } else {
    repos = await listRegisteredRepos();
  }

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

  if (provider === "qwen") {
    return requiredEnvStatus(["QWEN_API_KEY"]);
  }

  if (provider === "openrouter") {
    return requiredEnvStatus(["OPENROUTER_API_KEY"]);
  }

  if (provider === "openclaw-cli") {
    const selectorKeys = ["OPENCLAW_AGENT_ID", "OPENCLAW_SESSION_ID", "OPENCLAW_TO"];
    return [
      {
        name: "OPENCLAW_AGENT_ID|OPENCLAW_SESSION_ID|OPENCLAW_TO",
        present: selectorKeys.some((key) => Boolean(process.env[key])),
      },
    ];
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
    GOOGLE_API_KEY: "Google AI API Key",
    GOOGLE_MODEL: "Google model override (optional)",
    OPENAI_API_KEY: "OpenAI API Key",
    OPENAI_MODEL: "OpenAI model override (optional)",
    OPENROUTER_API_KEY: "OpenRouter API Key",
    OPENROUTER_MODEL: "OpenRouter model override (optional)",
    QWEN_API_KEY: "Qwen API Key",
    QWEN_MODEL: "Qwen model override (optional)",
    QWEN_BASE_URL: "Qwen Base URL (optional)",
    SLACK_SIGNING_SECRET: "Slack Signing Secret",
    SLACK_BOT_TOKEN: "Slack Bot Token",
    SLACK_WEBHOOK_URL: "Slack Incoming Webhook URL",
    SLACK_CHANNEL_ID: "Slack Channel ID",
    GITHUB_TOKEN: "GitHub Token",
    GITHUB_WEBHOOK_SECRET: "GitHub Webhook Secret",
    "OPENCLAW_AGENT_ID|OPENCLAW_SESSION_ID|OPENCLAW_TO": "OpenClaw target (agent id, session id, or recipient)",
    OPENCLAW_AGENT_ID: "OpenClaw Agent ID",
    OPENCLAW_SESSION_ID: "OpenClaw Session ID",
    OPENCLAW_TO: "OpenClaw recipient/target",
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

    const targetKey = key === "OPENCLAW_AGENT_ID|OPENCLAW_SESSION_ID|OPENCLAW_TO" ? "OPENCLAW_AGENT_ID" : key;
    collected.push({ key: targetKey, value: trimmed });
    process.env[targetKey] = trimmed;
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
      { value: "qwen", label: "Qwen" },
      { value: "openrouter", label: "OpenRouter" },
      { value: "openclaw-cli", label: "OpenClaw (CLI)" },
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

  const missingEnv = [
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

  if (missingEnv.length > 0 && isInteractive) {
    onboardingCapture.prompted = true;
    const prompted = await promptForEnv(missingEnv);
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
      output: { type: "string", default: "reports" },
      notify: { type: "boolean", default: false },
      "max-dependencies": { type: "string", default: "25" },
      "non-interactive": { type: "boolean", default: false },
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
