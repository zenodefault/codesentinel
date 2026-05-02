import { parseArgs } from "node:util";
import path from "node:path";
import { parseGitHistory } from "./git-history.mjs";
import { fetchJiraIssues } from "./jira.mjs";
import { readRepoMemory, writeRepoMemory } from "../memory/memory.mjs";

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
const ticketIds = [...new Set(history.flatMap((commit) => commit.ticketIds))];
const jira = await fetchJiraIssues(ticketIds);
const repoName = path.basename(repoPath);
const currentMemory = await readRepoMemory(repoName);
const updatedDecisionHistory = {
  ...currentMemory.decisionHistory,
  updatedAt: new Date().toISOString(),
  decisions: [
    ...currentMemory.decisionHistory.decisions.filter((entry) => entry.filePath !== values.file),
    {
      filePath: values.file,
      commitCount: history.length,
      commits: history,
      jiraIssues: jira.issues,
      warnings: jira.warnings,
    },
  ],
};

await writeRepoMemory(repoName, "decisionHistory", updatedDecisionHistory);

console.log(
  JSON.stringify(
    {
      repoName,
      repoPath,
      filePath: values.file,
      commitCount: history.length,
      commits: history,
      jiraIssues: jira.issues,
      warnings: jira.warnings,
    },
    null,
    2,
  ),
);
