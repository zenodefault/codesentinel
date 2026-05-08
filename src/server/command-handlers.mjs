import { execFile } from "node:child_process";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { ensureMemoryStructure, listRegisteredRepos, readModulePassports } from "../memory/memory.mjs";
import { 
  buildRegisterProgressBlocks, 
  buildRegisterSummaryBlocks, 
  buildScanBlocks, 
  buildSimpleErrorBlocks, 
  buildWhyBlocks,
  buildReposBlocks,
  buildRotReportBlocks,
  buildStandupBlocks,
  buildOwnershipBlocks,
  buildOnboardBlocks
} from "../slack/blocks.mjs";
import { readMemoryJson } from "../memory/memory.mjs";
import { MEMORY_ROOT, getRepoMemoryPaths } from "../memory/memory.mjs";

const execFileAsync = promisify(execFile);

async function handleRepos() {
  const repos = await listRegisteredRepos();
  return {
    statusCode: 200,
    body: {
      response_type: "in_channel",
      text: "List of registered repositories",
      blocks: buildReposBlocks(repos),
    },
  };
}

async function handleReport() {
  const result = await runJsonCommand(["./src/reports/run-weekly-report.mjs", "--output", "reports"]);
  return {
    statusCode: 200,
    body: {
      response_type: "in_channel",
      text: "Weekly Code Rot Report",
      blocks: buildRotReportBlocks(result.report),
    },
  };
}

async function handleStandup(text) {
  const [repoName, days = "1"] = text.trim().split(/\s+/);
  if (!repoName) {
    return {
      statusCode: 200,
      body: {
        response_type: "ephemeral",
        text: "Usage: /standup {repo_name} [days]",
        blocks: buildSimpleErrorBlocks("Standup needs a repo", "Use `/standup {repo_name} [days]` to summarize recent impact."),
      },
    };
  }

  const result = await runJsonCommand(["./src/cli/codesentinel.mjs", "standup", "--repo", repoName, "--days", days, "--json"]);
  return {
    statusCode: 200,
    body: {
      response_type: "in_channel",
      text: `Daily Impact for ${repoName}`,
      blocks: buildStandupBlocks(repoName, result),
    },
  };
}

async function handleOwnership(text) {
  const repoName = text.trim();
  const registered = await listRegisteredRepos();
  let repos = repoName ? [repoName] : registered;

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
        });
      }
    }
  }

  return {
    statusCode: 200,
    body: {
      response_type: "in_channel",
      text: "Ownership Audit Results",
      blocks: buildOwnershipBlocks(unclearModules),
    },
  };
}

async function handleOnboard(text) {
  const [repo, author, ...fileParts] = text.trim().split(/\s+/);
  const files = fileParts.join(",");

  if (!repo || !author || !files) {
    return {
      statusCode: 200,
      body: {
        response_type: "ephemeral",
        text: "Usage: /onboard {repo} {author} {files}",
        blocks: buildSimpleErrorBlocks("Onboard needs arguments", "Use `/onboard {repo} {author} {file1,file2}` to help someone get started."),
      },
    };
  }

  const result = await runJsonCommand(["./src/cli/codesentinel.mjs", "onboard-buddy", "--repo", repo, "--author", author, "--files", files, "--json"]);
  return {
    statusCode: 200,
    body: {
      response_type: "in_channel",
      text: `Onboarding Context for ${author}`,
      blocks: buildOnboardBlocks(result.contexts, result.message),
    },
  };
}

function parseRepoName(repoInput) {
  const trimmed = repoInput.trim().replace(/\/+$/, "");
  const last = trimmed.split("/").pop() ?? trimmed;
  return last.endsWith(".git") ? last.slice(0, -4) : last;
}

function isLocalPath(repoInput) {
  return !/^(https?:\/\/|git@|ssh:\/\/)/.test(repoInput);
}

function countByRisk(dependencies) {
  return dependencies.reduce(
    (counts, dependency) => {
      const level = dependency.riskLevel ?? "LOW";
      counts[level] = (counts[level] ?? 0) + 1;
      return counts;
    },
    {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      CRITICAL: 0,
    },
  );
}

async function findFirstTrackedFile(repoName) {
  const repoPaths = await getRepoMemoryPaths(repoName);
  const blast = await readMemoryJson(repoPaths.blastRadiusMap);
  return Object.keys(blast.files ?? {}).sort()[0] ?? null;
}

async function runJsonCommand(args) {
  const { stdout } = await execFileAsync("node", args, {
    cwd: process.cwd(),
  });
  const jsonStart = stdout.indexOf("{");
  return JSON.parse(stdout.slice(jsonStart));
}

async function handleRegister(text) {
  const [, action, repoInput] = text.trim().match(/^(\S+)?\s*(.*)$/) ?? [];

  if (action !== "register" || !repoInput) {
    return {
      statusCode: 200,
      body: {
        response_type: "ephemeral",
        text: "Usage: /sentinel register {github_repo_url_or_local_path}",
        blocks: buildSimpleErrorBlocks("Registration command needs a repo", "Use `/sentinel register {github_repo_url_or_local_path}` to register a repository."),
      },
    };
  }

  const repoName = parseRepoName(repoInput);
  await ensureMemoryStructure(repoName);
  const cveSweep = await runJsonCommand(["./src/cve-sweep/run-cve-sweep.mjs", "--repo", repoInput, "--repo-name", repoName, "--max-dependencies", "25"]);
  const archaeologyFile = isLocalPath(repoInput) ? await findFirstTrackedFile(repoName) : null;

  if (archaeologyFile) {
    await runJsonCommand(["./src/git-archaeologist/run-git-archaeologist.mjs", "--repo", repoInput, "--file", archaeologyFile]);
  }

  const repoPaths = await getRepoMemoryPaths(repoName);
  const dependencyLedger = await readMemoryJson(repoPaths.dependencyLedger);
  const modulePassportDir = repoPaths.modulePassportsDir.pathname;
  let modulePassportCount = 0;

  try {
    modulePassportCount = (await readdir(modulePassportDir)).length;
  } catch {
    modulePassportCount = 0;
  }

  const ghostAuthorCount = modulePassportCount;
  const summaryBlocks = buildRegisterSummaryBlocks({
    repoName,
    totalDependencies: dependencyLedger.dependencies?.length ?? cveSweep.dependencyCount ?? 0,
    criticalIssues: dependencyLedger.alerts?.criticalDependencies?.length ?? 0,
    ghostAuthorCount,
    modulePassportCount,
  });

  if (!isLocalPath(repoInput)) {
    summaryBlocks.splice(summaryBlocks.length - 1, 0, {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Git archaeology was deferred because the repo was registered by remote URL. Run `/why <file>` against a local checkout to populate module passports.",
      },
    });
  }

  return {
    statusCode: 200,
    body: {
      response_type: "in_channel",
      text: `CodeSentinel registered ${repoName}.`,
      blocks: summaryBlocks,
    },
    initial: {
      response_type: "ephemeral",
      text: `Registering ${repoInput}`,
      blocks: buildRegisterProgressBlocks(repoInput),
    },
  };
}

async function handleScan(text) {
  const repoName = text.trim();

  if (!repoName) {
    return {
      statusCode: 200,
      body: {
        response_type: "ephemeral",
        text: "Usage: /scan {repo_name}",
        blocks: buildSimpleErrorBlocks("Scan command needs a repo", "Use `/scan {repo_name}` to run an on-demand cve-sweep on a registered repository."),
      },
    };
  }

  const registered = await listRegisteredRepos();

  if (!registered.includes(repoName)) {
    return {
      statusCode: 200,
      body: {
        response_type: "ephemeral",
        text: `Repo ${repoName} is not registered.`,
        blocks: buildSimpleErrorBlocks("Unknown repo", `No Durable Memory folder exists for *${repoName}* yet. Register it first with \`/sentinel register\`.`),
      },
    };
  }

  const repoPaths = await getRepoMemoryPaths(repoName);
  const dependencyLedger = await readMemoryJson(repoPaths.dependencyLedger);
  const repoInput = dependencyLedger.source?.input ?? path.dirname(dependencyLedger.manifest?.path ?? "");

  if (!repoInput) {
    return {
      statusCode: 200,
      body: {
        response_type: "ephemeral",
        text: `Repo ${repoName} is missing a source path.`,
        blocks: buildSimpleErrorBlocks("Repo source unavailable", `CodeSentinel cannot rerun \`cve-sweep\` for *${repoName}* because its source path or URL is missing from Durable Memory.`),
      },
    };
  }

  const refreshed = await runJsonCommand(["./src/cve-sweep/run-cve-sweep.mjs", "--repo", repoInput, "--repo-name", repoName, "--max-dependencies", "25"]);
  return {
    statusCode: 200,
    body: {
      response_type: "in_channel",
      text: `Dependency scan summary for ${repoName}`,
      blocks: buildScanBlocks({
        repoName,
        dependencies: refreshed.dependencies ?? [],
        counts: countByRisk(refreshed.dependencies ?? []),
      }),
    },
  };
}

async function handleWhy(text) {
  const filePath = text.trim();

  if (!filePath) {
    return {
      statusCode: 200,
      body: {
        response_type: "ephemeral",
        text: "Usage: /why {file_path}",
        blocks: buildSimpleErrorBlocks("Why command needs a file", "Use `/why {file_path}` to fetch a Module Passport for a tracked file."),
      },
    };
  }

  const repoRoot = process.env.CODESENTINEL_DEFAULT_REPO ?? process.cwd();
  const result = await runJsonCommand(["./src/git-archaeologist/run-git-archaeologist.mjs", "--repo", repoRoot, "--file", filePath]);

  return {
    statusCode: 200,
    body: {
      response_type: "in_channel",
      text: `Module Passport for ${filePath}`,
      blocks: buildWhyBlocks(result.modulePassport),
    },
  };
}

export async function routeSlackCommand(command, text) {
  if (command === "/sentinel") {
    return handleRegister(text);
  }

  if (command === "/scan") {
    return handleScan(text);
  }

  if (command === "/why") {
    return handleWhy(text);
  }

  if (command === "/report") {
    return handleReport();
  }

  if (command === "/repos") {
    return handleRepos();
  }

  if (command === "/standup") {
    return handleStandup(text);
  }

  if (command === "/ownership") {
    return handleOwnership(text);
  }

  if (command === "/onboard") {
    return handleOnboard(text);
  }

  return {
    statusCode: 200,
    body: {
      response_type: "ephemeral",
      text: `Unsupported slash command: ${command}`,
      blocks: buildSimpleErrorBlocks("Unsupported command", `The command *${command}* is not wired yet.`),
    },
  };
}
