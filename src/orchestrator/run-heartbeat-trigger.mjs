import { execFile } from "node:child_process";
import path from "node:path";
import { parseArgs } from "node:util";
import { promisify } from "node:util";
import { loadHeartbeatConfig } from "../heartbeat/load-heartbeat.mjs";
import { listRegisteredRepos, readRepoMemory } from "../memory/memory.mjs";

const execFileAsync = promisify(execFile);

const { values } = parseArgs({
  options: {
    trigger: {
      type: "string",
    },
  },
});

if (!values.trigger) {
  throw new Error("--trigger is required.");
}

const heartbeat = await loadHeartbeatConfig();
const trigger = heartbeat.triggers.find((entry) => entry.id === values.trigger);

if (!trigger) {
  throw new Error(`Unknown heartbeat trigger: ${values.trigger}`);
}

if (trigger.skill !== "cve-sweep") {
  throw new Error(`This runner currently supports cve-sweep dispatch only, received ${trigger.skill}`);
}

const repos = await listRegisteredRepos();
const results = [];

for (const repoName of repos) {
  const memory = await readRepoMemory(repoName);
  const manifestPath = memory.dependencyLedger.manifest?.path;

  if (!manifestPath) {
    results.push({
      repoName,
      status: "skipped",
      reason: "manifest path missing from dependency ledger",
    });
    continue;
  }

  const repoPath = path.dirname(manifestPath);
  const { stdout } = await execFileAsync(
    "node",
    [
      "./src/cve-sweep/run-cve-sweep.mjs",
      "--repo",
      repoPath,
      "--repo-name",
      repoName,
      "--max-dependencies",
      "5",
    ],
    { cwd: process.cwd() },
  );

  const jsonStart = stdout.indexOf("{");
  const output = JSON.parse(stdout.slice(jsonStart));

  results.push({
    repoName,
    status: "completed",
    dependencyCount: output.dependencyCount,
    alerts: output.alerts,
  });
}

console.log(
  JSON.stringify(
    {
      trigger,
      repoCount: repos.length,
      results,
    },
    null,
    2,
  ),
);
