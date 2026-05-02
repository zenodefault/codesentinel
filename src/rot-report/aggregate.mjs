import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { listRegisteredRepos, MEMORY_ROOT, readRepoMemory, readSharedMemory } from "../memory/memory.mjs";
import { parseJsonBlock } from "../memory/json-block.mjs";

function classifyHealthScore(dependencies) {
  if (!dependencies.length) {
    return 100;
  }

  const maxPossible = dependencies.length * 10;
  const total = dependencies.reduce((sum, dependency) => sum + Math.min(Number(dependency.actualRisk ?? 0), 10), 0);
  return Math.max(0, Math.round(((maxPossible - total) / maxPossible) * 100));
}

function buildCounts(dependencies) {
  return dependencies.reduce(
    (counts, dependency) => {
      const level = dependency.riskLevel ?? "LOW";
      counts[level] = (counts[level] ?? 0) + 1;
      return counts;
    },
    {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      CRITICAL: 0,
    },
  );
}

function hasSeverityWorsened(decision, dependency) {
  const previous = Number(decision.riskScoreAtDecision ?? decision.actualRiskAtDecision ?? 0);
  const current = Number(dependency.actualRisk ?? 0);
  return current > previous || dependency.riskLevel === "CRITICAL";
}

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

export async function buildRotReport() {
  const repos = await listRegisteredRepos();
  const upgradeDecisions = await readSharedMemory("upgradeDecisions");
  const ghostAuthors = await readSharedMemory("ghostAuthors");
  const perRepo = [];
  const allDependencies = [];
  const allPassports = [];

  for (const repoName of repos) {
    const memory = await readRepoMemory(repoName);
    const dependencies = (memory.dependencyLedger.dependencies ?? []).map((dependency) => ({
      ...dependency,
      repo: repoName,
    }));
    const counts = buildCounts(dependencies);
    const modulePassports = await readModulePassports(repoName);

    perRepo.push({
      repo: repoName,
      updatedAt: memory.dependencyLedger.updatedAt,
      dependencyCount: dependencies.length,
      counts,
      highestRisk: dependencies.reduce((max, dependency) => Math.max(max, Number(dependency.actualRisk ?? 0)), 0),
    });
    allDependencies.push(...dependencies);
    allPassports.push(...modulePassports.map((passport) => ({ ...passport, repo: repoName })));
  }

  const dependencyIndex = new Map(allDependencies.map((dependency) => [`${dependency.repo}:${dependency.name}`, dependency]));
  const overdueDeferrals = (upgradeDecisions.decisions ?? [])
    .map((decision) => {
      const dependency = dependencyIndex.get(`${decision.repo}:${decision.dependency}`);
      const deadlinePassed = decision.deferUntil ? new Date(decision.deferUntil).getTime() < Date.now() : false;
      const severityWorsened = dependency ? hasSeverityWorsened(decision, dependency) : false;

      return {
        ...decision,
        overdue: deadlinePassed || severityWorsened,
        currentRiskLevel: dependency?.riskLevel ?? null,
        currentActualRisk: dependency?.actualRisk ?? null,
      };
    })
    .filter((decision) => decision.overdue);

  const topDependencies = [...allDependencies]
    .filter((dependency) => dependency.riskLevel !== "LOW" || (dependency.advisories?.length ?? 0) > 0)
    .sort((left, right) => Number(right.actualRisk ?? 0) - Number(left.actualRisk ?? 0))
    .slice(0, 5);
  const counts = buildCounts(allDependencies);
  const weeklyWins = allDependencies
    .filter((dependency) => dependency.remediatedAt || dependency.fixedThisWeek)
    .map((dependency) => ({
      repo: dependency.repo,
      dependency: dependency.name,
      summary: dependency.remediationSummary ?? `Resolved ${dependency.name}`,
    }));
  const blastRadiusLeaders = [...allPassports]
    .sort((left, right) => Number(right.blastRadiusScore ?? 0) - Number(left.blastRadiusScore ?? 0))
    .slice(0, 10)
    .map((passport) => ({
      repo: passport.repo,
      module: passport.module,
      blastRadiusScore: passport.blastRadiusScore ?? passport.blastRadius?.blastRadiusCount ?? 0,
      riskSummary: passport.riskSummary ?? "",
    }));
  const openActions = overdueDeferrals
    .filter((entry) => entry.prUrl || entry.approvalStatus === "pending")
    .map((entry) => ({
      repo: entry.repo,
      dependency: entry.dependency,
      prUrl: entry.prUrl ?? null,
      status: entry.approvalStatus ?? "pending",
      reason: entry.reason,
    }));

  return {
    generatedAt: new Date().toISOString(),
    repoCount: repos.length,
    repos,
    perRepo,
    counts,
    overallHealthScore: classifyHealthScore(allDependencies),
    topDependencies,
    overdueDeferrals,
    weeklyWins,
    blastRadiusLeaders,
    ghostAuthorCount: (ghostAuthors.ghostAuthors ?? []).length,
    openActions,
  };
}
