import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

async function run() {
  const repo = process.env.E2E_REPO_PATH;
  const repoFullName = process.env.E2E_REPO_FULL_NAME;
  const dependency = process.env.E2E_DEPENDENCY;
  const cve = process.env.E2E_CVE;
  const ecosystem = process.env.E2E_ECOSYSTEM ?? "npm";

  if (!repo || !repoFullName || !dependency || !cve) {
    throw new Error("E2E_REPO_PATH, E2E_REPO_FULL_NAME, E2E_DEPENDENCY and E2E_CVE are required");
  }

  const { stdout } = await execFileAsync("node", [
    "./src/auto-fix/run-auto-fix.mjs",
    "--repo",
    repo,
    "--repo-full-name",
    repoFullName,
    "--ecosystem",
    ecosystem,
    "--dependency",
    dependency,
    "--cve",
    cve,
  ]);

  const jsonStart = stdout.indexOf("{");
  const result = JSON.parse(stdout.slice(jsonStart));

  console.log(
    JSON.stringify(
      {
        status: result.status,
        dependency: result.dependency,
        cveId: result.cveId,
        pullRequest: result.pullRequest ?? null,
      },
      null,
      2,
    ),
  );
}

await run();
