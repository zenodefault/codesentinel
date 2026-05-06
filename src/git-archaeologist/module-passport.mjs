import { readFile } from "node:fs/promises";
import path from "node:path";
import { promptLlm } from "../llm/client.mjs";
import { readRepoMemory, writeModulePassport, toPath } from "../memory/memory.mjs";

function parseExternalImports(filePath, source) {
  const extension = path.extname(filePath);

  if ([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"].includes(extension)) {
    const imports = [];
    const patterns = [
      /from\s+["']([^"']+)["']/g,
      /require\(\s*["']([^"']+)["']\s*\)/g,
      /import\(\s*["']([^"']+)["']\s*\)/g,
    ];

    for (const pattern of patterns) {
      for (const match of source.matchAll(pattern)) {
        if (!match[1].startsWith(".")) {
          imports.push(match[1]);
        }
      }
    }

    return [...new Set(imports)];
  }

  if (extension === ".py") {
    const imports = [];
    for (const match of source.matchAll(/^(?:from|import)\s+([A-Za-z0-9_\.]+)/mg)) {
      if (!match[1].startsWith(".")) {
        imports.push(match[1].split(".")[0]);
      }
    }
    return [...new Set(imports)];
  }

  return [];
}

function fallbackSummary(passport) {
  const depSummary =
    passport.dependencyStatus.length > 0
      ? passport.dependencyStatus.map((entry) => `${entry.name}:${entry.riskLevel}`).join(", ")
      : "no tracked external dependency risk";
  const ownerSummary = passport.ownership?.primaryOwner?.label
    ? `Primary contact is ${passport.ownership.primaryOwner.label}${passport.ownership.likelyTeam ? ` via ${passport.ownership.likelyTeam.name}` : ""}.`
    : "No clear owner is mapped yet.";

  return `Module ${passport.module} has blast radius ${passport.blastRadiusScore}, ${passport.ghostAuthors.length} ghost author(s), and ${depSummary}. ${ownerSummary} Review ghost-owned changes first and prioritize dependencies above MEDIUM risk.`;
}

async function generateRiskSummary(passport) {
  const prompt = `Summarize this module risk in plain English for engineers. Focus on why it matters and what to review first.\n\n${JSON.stringify(
    passport,
    null,
    2,
  )}`;

  try {
    const text = await promptLlm(prompt, { max_tokens: 300 });
    return {
      summary: text || fallbackSummary(passport),
      warning: null,
    };
  } catch (error) {
    return {
      summary: fallbackSummary(passport),
      warning: `LLM summary generation failed: ${error.message}`,
    };
  }
}

export async function buildModulePassport(repoPath, repoName, filePath, archaeologyResult) {
  const repoMemory = await readRepoMemory(repoName);
  const absolutePath = path.join(repoPath, filePath);
  const source = await readFile(absolutePath, "utf8");
  const externalImports = parseExternalImports(filePath, source);
  const dependencyStatus = repoMemory.dependencyLedger.dependencies.filter((dependency) =>
    externalImports.some((importName) => dependency.name === importName || dependency.name.endsWith(`/${importName}`)),
  );
  const blastRadiusEntry = repoMemory.blastRadiusMap.files[filePath] ?? {
    directDependents: [],
    impactedFiles: [],
    blastRadiusCount: 0,
  };

  const passport = {
    module: filePath,
    generatedAt: new Date().toISOString(),
    whatItDoes: `Implements ${path.basename(filePath)} and coordinates repository logic for ${path.dirname(filePath) || "the repo root"}.`,
    blastRadiusScore: blastRadiusEntry.blastRadiusCount,
    blastRadius: blastRadiusEntry,
    ghostAuthors: archaeologyResult.ghostAuthors,
    ownership: archaeologyResult.ownership,
    keyDecisions: archaeologyResult.jiraIssues,
    dependencyStatus,
  };
  const summary = await generateRiskSummary(passport);

  const finalPassport = {
    ...passport,
    riskSummary: summary.summary,
    warnings: [...archaeologyResult.warnings, ...(summary.warning ? [summary.warning] : [])],
  };

  const passportFile = await writeModulePassport(repoName, filePath, finalPassport);
  return {
    path: toPath(passportFile),
    content: finalPassport,
  };
}
