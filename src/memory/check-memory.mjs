import {
  ensureMemoryStructure,
  getRepoMemoryPaths,
  getSharedMemoryPaths,
  listRegisteredRepos,
  readMemoryJson,
} from "./memory.mjs";

const targetRepo = "codesentinel";

try {
  await ensureMemoryStructure(targetRepo);

  const shared = getSharedMemoryPaths();
  const repo = await getRepoMemoryPaths(targetRepo);

  await readMemoryJson(shared.upgradeDecisions);
  await readMemoryJson(shared.ghostAuthors);
  await readMemoryJson(repo.dependencyLedger);
  await readMemoryJson(repo.blastRadiusMap);
  await readMemoryJson(repo.decisionHistory);

  const repos = await listRegisteredRepos();

  console.log(`Memory schema check passed. Registered repos: ${repos.join(", ")}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
