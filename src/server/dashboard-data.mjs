import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { MEMORY_ROOT, listRegisteredRepos, readRepoMemory, readSharedMemory } from "../memory/memory.mjs";
import { parseJsonBlock } from "../memory/json-block.mjs";
import { buildRotReport } from "../rot-report/aggregate.mjs";

async function readModulePassports(repoName) {
  const moduleDir = path.join(new URL(MEMORY_ROOT).pathname, "repos", repoName, "module_passports");

  try {
    const entries = await readdir(moduleDir);
    const passports = [];

    for (const entry of entries) {
      const raw = await readFile(path.join(moduleDir, entry), "utf8");
      passports.push(parseJsonBlock(raw, entry));
    }

    return passports;
  } catch {
    return [];
  }
}

export async function buildDashboardData() {
  const repos = await listRegisteredRepos();
  const sharedGhostAuthors = await readSharedMemory("ghostAuthors");
  const report = await buildRotReport();
  const dependencyMatrix = [];
  const blastRadiusRows = [];

  for (const repoName of repos) {
    const memory = await readRepoMemory(repoName);
    const dependencies = memory.dependencyLedger.dependencies ?? [];
    const passports = await readModulePassports(repoName);

    for (const dependency of dependencies) {
      dependencyMatrix.push({
        repo: repoName,
        name: dependency.name,
        version: dependency.version ?? dependency.versionRange ?? "unknown",
        actualRisk: dependency.actualRisk ?? 0,
        riskLevel: dependency.riskLevel ?? "LOW",
        cveIds: (dependency.advisories ?? []).map((entry) => entry.cveId ?? entry.id).filter(Boolean),
        recommendedAction: dependency.riskLevel === "CRITICAL" ? "Patch immediately" : dependency.riskLevel === "HIGH" ? "Review upgrade path" : "Monitor",
      });
    }

    for (const passport of passports) {
      blastRadiusRows.push({
        repo: repoName,
        filePath: passport.module,
        blastRadiusScore: passport.blastRadiusScore ?? passport.blastRadius?.blastRadiusCount ?? 0,
        ghostAuthors: passport.ghostAuthors?.length ?? 0,
        riskSummary: passport.riskSummary ?? "",
      });
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    dependencyMatrix: dependencyMatrix.sort((left, right) => Number(right.actualRisk) - Number(left.actualRisk)),
    blastRadiusRows: blastRadiusRows.sort((left, right) => Number(right.blastRadiusScore) - Number(left.blastRadiusScore)),
    openActions: report.openActions,
    counts: report.counts,
    repos,
    ghostAuthorCount: sharedGhostAuthors.ghostAuthors?.length ?? 0,
  };
}
