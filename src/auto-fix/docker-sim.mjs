import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function runBuildSimulation({ ecosystem, repoPath }) {
  const image = ecosystem === "npm" ? "node:22-alpine" : "python:3.12-slim";
  const cmd = ecosystem === "npm" ? "npm ci && npm test --if-present" : "pip install -r requirements.txt && pytest -q";

  try {
    const { stdout, stderr } = await execFileAsync(
      "docker",
      [
        "run",
        "--rm",
        "-v",
        `${repoPath}:/app`,
        "-w",
        "/app",
        image,
        "sh",
        "-lc",
        cmd,
      ],
      { maxBuffer: 1024 * 1024 * 8 },
    );

    return { passed: true, exitCode: 0, stdout, stderr };
  } catch (error) {
    return {
      passed: false,
      exitCode: error.code ?? 1,
      stdout: error.stdout ?? "",
      stderr: error.stderr ?? error.message,
    };
  }
}
