import { parseArgs } from "node:util";
import path from "node:path";
import { buildBlastRadiusMap } from "../analysis/file-blast-radius.mjs";
import { parseGitHistory } from "./git-history.mjs";
import { identifyGhostAuthors } from "./ghost-authors.mjs";
import { fetchJiraIssues } from "./jira.mjs";
import { buildModulePassport } from "./module-passport.mjs";
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
const ghostAnalysis = await identifyGhostAuthors({
  repoName,
  filePath: values.file,
  commits: history,
});
const blastRadiusMap = await buildBlastRadiusMap(repoPath);
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
      ghostAuthors: ghostAnalysis.ghostAuthors,
      ghostOwnershipRisk: ghostAnalysis.riskLevel,
      warnings: [...jira.warnings, ...ghostAnalysis.warnings],
    },
  ],
};
await writeRepoMemory(repoName, "blastRadiusMap", {
  repo: repoName,
  updatedAt: new Date().toISOString(),
  files: blastRadiusMap,
});

await writeRepoMemory(repoName, "decisionHistory", updatedDecisionHistory);
const archaeologyResult = {
  jiraIssues: jira.issues,
  ghostAuthors: ghostAnalysis.ghostAuthors,
  warnings: [...jira.warnings, ...ghostAnalysis.warnings],
};
const modulePassport = await buildModulePassport(repoPath, repoName, values.file, archaeologyResult);

console.log(
  JSON.stringify(
    {
      repoName,
      repoPath,
      filePath: values.file,
      commitCount: history.length,
      commits: history,
      jiraIssues: jira.issues,
      ghostAuthors: ghostAnalysis.ghostAuthors,
      ghostOwnershipRisk: ghostAnalysis.riskLevel,
      blastRadius: blastRadiusMap[values.file] ?? { directDependents: [], impactedFiles: [], blastRadiusCount: 0 },
      warnings: [...jira.warnings, ...ghostAnalysis.warnings],
      modulePassport,
    },
    null,
    2,
  ),
);
