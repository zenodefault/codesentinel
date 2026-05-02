import { parseArgs } from "node:util";
import path from "node:path";
import { parseGitHistory } from "./git-history.mjs";

const { values } = parseArgs({
  options: {
    repo: {
      type: "string",
      short: "r",
    },
    file: {
      type: "string",
      short: "f",
    },
  },
});

if (!values.file) {
  throw new Error("--file is required.");
}

const repoPath = path.resolve(values.repo ?? process.cwd());
const history = await parseGitHistory(repoPath, values.file);

console.log(
  JSON.stringify(
    {
      repoPath,
      filePath: values.file,
      commitCount: history.length,
      commits: history,
    },
    null,
    2,
  ),
);
