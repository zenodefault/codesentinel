import { MEMORY_ROOT, listRegisteredRepos, readModulePassports, readRepoMemory, readSharedMemory } from "../memory/memory.mjs";
import { parseJsonBlock } from "../memory/json-block.mjs";
import { buildRotReport } from "../rot-report/aggregate.mjs";

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
        owner: passport.ownership?.primaryOwner?.label ?? "Unmapped",
        team: passport.ownership?.likelyTeam?.name ?? "Unassigned",
        contacts: (passport.ownership?.suggestedContacts ?? []).slice(0, 2).map((entry) => entry.label).join(", ") || "None",
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
