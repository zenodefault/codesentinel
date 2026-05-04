import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseJsonBlock } from "./json-block.mjs";

export const MEMORY_ROOT = new URL("../../workspace/memory/", import.meta.url);
export const REPOS_ROOT = new URL("./repos/", MEMORY_ROOT);

function repoSlug(repoName) {
  return repoName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toPath(url) {
  return new URL(url).pathname;
}

function buildMarkdown(title, description, data) {
  return `# ${title}\n\n${description}\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n`;
}

async function ensureDir(url) {
  await mkdir(url, { recursive: true });
}

async function ensureFile(url, contents) {
  try {
    await readFile(url, "utf8");
  } catch {
    await writeFile(url, contents, "utf8");
  }
}

export function getRepoMemoryPaths(repoName) {
  const slug = repoSlug(repoName);

  if (!slug) {
    throw new Error("repoName must resolve to a non-empty slug.");
  }

  const repoRoot = new URL(`./${slug}/`, REPOS_ROOT);

  return {
    slug,
    repoRoot,
    dependencyLedger: new URL("./dependency_ledger.md", repoRoot),
    blastRadiusMap: new URL("./blast_radius_map.md", repoRoot),
    modulePassportsDir: new URL("./module_passports/", repoRoot),
    decisionHistory: new URL("./decision_history.md", repoRoot),
  };
}

export function getSharedMemoryPaths() {
  return {
    root: MEMORY_ROOT,
    reposRoot: REPOS_ROOT,
    upgradeDecisions: new URL("./upgrade_decisions.md", MEMORY_ROOT),
    ghostAuthors: new URL("./ghost_authors.md", MEMORY_ROOT),
    schema: new URL("./SCHEMA.md", MEMORY_ROOT),
  };
}

export async function ensureMemoryStructure(repoName) {
  const shared = getSharedMemoryPaths();

  await ensureDir(shared.root);
  await ensureDir(shared.reposRoot);
  await ensureFile(
    shared.upgradeDecisions,
    buildMarkdown(
      "Upgrade Decisions",
      "Human deferrals and upgrade decisions across all registered repositories.",
      { decisions: [] },
    ),
  );
  await ensureFile(
    shared.ghostAuthors,
    buildMarkdown(
      "Ghost Authors",
      "Former contributors who still own meaningful historical context.",
      { ghostAuthors: [] },
    ),
  );

  if (!repoName) {
    return;
  }

  const repo = getRepoMemoryPaths(repoName);

  await ensureDir(repo.repoRoot);
  await ensureDir(repo.modulePassportsDir);
  await ensureFile(
    repo.dependencyLedger,
    buildMarkdown(
      "Dependency Ledger",
      `Tracked dependency risk data for ${repo.slug}.`,
      { repo: repo.slug, updatedAt: null, dependencies: [] },
    ),
  );
  await ensureFile(
    repo.blastRadiusMap,
    buildMarkdown(
      "Blast Radius Map",
      `Reverse dependency map for ${repo.slug}.`,
      { repo: repo.slug, updatedAt: null, files: {} },
    ),
  );
  await ensureFile(
    repo.decisionHistory,
    buildMarkdown(
      "Decision History",
      `Git and ticket-derived decision context for ${repo.slug}.`,
      { repo: repo.slug, updatedAt: null, decisions: [] },
    ),
  );
}

export async function listRegisteredRepos() {
  await ensureDir(REPOS_ROOT);
  const entries = await readdir(REPOS_ROOT, { withFileTypes: true });

  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

export async function readMemoryJson(fileUrl) {
  const raw = await readFile(fileUrl, "utf8");
  return parseJsonBlock(raw, toPath(fileUrl));
}

export async function writeMemoryJson(fileUrl, title, description, data) {
  await writeFile(fileUrl, buildMarkdown(title, description, data), "utf8");
}

export async function readSharedMemory(kind) {
  await ensureMemoryStructure();
  const shared = getSharedMemoryPaths();

  const fileMap = {
    upgradeDecisions: shared.upgradeDecisions,
    ghostAuthors: shared.ghostAuthors,
  };

  const target = fileMap[kind];

  if (!target) {
    throw new Error(`Unsupported shared memory kind: ${kind}`);
  }

  return readMemoryJson(target);
}

export async function readRepoMemory(repoName) {
  await ensureMemoryStructure(repoName);
  const repo = getRepoMemoryPaths(repoName);

  return {
    repo: repo.slug,
    dependencyLedger: await readMemoryJson(repo.dependencyLedger),
    blastRadiusMap: await readMemoryJson(repo.blastRadiusMap),
    decisionHistory: await readMemoryJson(repo.decisionHistory),
  };
}

export async function writeRepoMemory(repoName, kind, data) {
  await ensureMemoryStructure(repoName);
  const repo = getRepoMemoryPaths(repoName);

  const fileMap = {
    dependencyLedger: {
      file: repo.dependencyLedger,
      title: "Dependency Ledger",
      description: `Tracked dependency risk data for ${repo.slug}.`,
    },
    blastRadiusMap: {
      file: repo.blastRadiusMap,
      title: "Blast Radius Map",
      description: `Reverse dependency map for ${repo.slug}.`,
    },
    decisionHistory: {
      file: repo.decisionHistory,
      title: "Decision History",
      description: `Git and ticket-derived decision context for ${repo.slug}.`,
    },
  };

  const target = fileMap[kind];

  if (!target) {
    throw new Error(`Unsupported repo memory kind: ${kind}`);
  }

  await writeMemoryJson(target.file, target.title, target.description, data);
}

export async function readModulePassports(repoName) {
  const repo = getRepoMemoryPaths(repoName);
  const moduleDir = toPath(repo.modulePassportsDir);

  try {
    const entries = await readdir(moduleDir);
    const passports = [];

    for (const entry of entries) {
      if (!entry.endsWith(".md")) {
        continue;
      }
      const raw = await readFile(path.join(moduleDir, entry), "utf8");
      passports.push(parseJsonBlock(raw, entry));
    }

    return passports;
  } catch {
    return [];
  }
}

export async function writeModulePassport(repoName, moduleName, data) {
  await ensureMemoryStructure(repoName);
  const repo = getRepoMemoryPaths(repoName);
  const safeModuleName = `${moduleName.replace(/[^a-zA-Z0-9._-]+/g, "_")}.md`;
  const passportFile = new URL(`./${safeModuleName}`, repo.modulePassportsDir);

  await writeMemoryJson(
    passportFile,
    `Module Passport - ${moduleName}`,
    `Module-level operational context for ${moduleName} in ${repo.slug}.`,
    data,
  );

  return passportFile;
}

export async function appendSharedMemory(kind, entry) {
  await ensureMemoryStructure();

  const shared = getSharedMemoryPaths();
  const fileMap = {
    upgradeDecisions: {
      file: shared.upgradeDecisions,
      key: "decisions",
      title: "Upgrade Decisions",
      description: "Human deferrals and upgrade decisions across all registered repositories.",
    },
    ghostAuthors: {
      file: shared.ghostAuthors,
      key: "ghostAuthors",
      title: "Ghost Authors",
      description: "Former contributors who still own meaningful historical context.",
    },
  };

  const target = fileMap[kind];

  if (!target) {
    throw new Error(`Unsupported shared memory kind: ${kind}`);
  }

  const current = await readMemoryJson(target.file);
  current[target.key].push(entry);
  await writeMemoryJson(target.file, target.title, target.description, current);
}

export function resolveRepoPath(repoName, ...segments) {
  const { repoRoot } = getRepoMemoryPaths(repoName);
  return path.join(toPath(repoRoot), ...segments);
}
