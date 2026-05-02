import { execFile } from "node:child_process";
import path from "node:path";
import { parseArgs } from "node:util";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const { values } = parseArgs({
  options: {
    command: {
      type: "string",
    },
    text: {
      type: "string",
    },
    repo: {
      type: "string",
      default: process.cwd(),
    },
  },
});

if (!values.command) {
  throw new Error("--command is required.");
}

if (values.command === "/why") {
  if (!values.text) {
    throw new Error("/why requires a file path in --text");
  }

  const repoPath = path.resolve(values.repo);
  const { stdout } = await execFileAsync(
    "node",
    ["./src/git-archaeologist/run-git-archaeologist.mjs", "--repo", repoPath, "--file", values.text],
    { cwd: process.cwd() },
  );

  const jsonStart = stdout.indexOf("{");
  console.log(stdout.slice(jsonStart));
} else {
  throw new Error(`Unsupported command: ${values.command}`);
}
