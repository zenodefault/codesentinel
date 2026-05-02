import { readFile } from "node:fs/promises";
import fg from "fast-glob";
import path from "node:path";

const JS_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];
const PY_EXTENSIONS = [".py"];
const SOURCE_GLOBS = ["**/*.{js,jsx,ts,tsx,mjs,cjs,py}"];
const IGNORE_GLOBS = ["**/node_modules/**", "**/.git/**", "**/dist/**", "**/coverage/**"];

function unique(values) {
  return [...new Set(values)].sort();
}

function resolveJsImport(specifier, fromFile, knownFiles) {
  if (!specifier.startsWith(".")) {
    return null;
  }

  const basePath = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    basePath,
    ...JS_EXTENSIONS.map((extension) => `${basePath}${extension}`),
    ...JS_EXTENSIONS.map((extension) => path.join(basePath, `index${extension}`)),
  ];

  return candidates.find((candidate) => knownFiles.has(candidate)) ?? null;
}

function resolvePythonImport(specifier, repoPath, knownFiles) {
  const candidates = [
    path.join(repoPath, `${specifier.replace(/\./g, "/")}.py`),
    path.join(repoPath, specifier.replace(/\./g, "/"), "__init__.py"),
  ];

  return candidates.find((candidate) => knownFiles.has(candidate)) ?? null;
}

function parseJsImports(source) {
  const matches = [];
  const patterns = [
    /from\s+["']([^"']+)["']/g,
    /require\(\s*["']([^"']+)["']\s*\)/g,
    /import\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      matches.push(match[1]);
    }
  }

  return matches;
}

function parsePythonImports(source) {
  const matches = [];
  const patterns = [/^from\s+([A-Za-z0-9_\.]+)\s+import/mg, /^import\s+([A-Za-z0-9_\.]+)/mg];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      matches.push(match[1]);
    }
  }

  return matches;
}

export async function buildBlastRadiusMap(repoPath) {
  const files = await fg(SOURCE_GLOBS, {
    cwd: repoPath,
    absolute: true,
    ignore: IGNORE_GLOBS,
  });
  const knownFiles = new Set(files);
  const forward = new Map();
  const reverse = new Map();

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const dependencies = [];

    if (JS_EXTENSIONS.includes(path.extname(file))) {
      for (const specifier of parseJsImports(source)) {
        const resolved = resolveJsImport(specifier, file, knownFiles);
        if (resolved) {
          dependencies.push(resolved);
        }
      }
    } else if (PY_EXTENSIONS.includes(path.extname(file))) {
      for (const specifier of parsePythonImports(source)) {
        const resolved = resolvePythonImport(specifier, repoPath, knownFiles);
        if (resolved) {
          dependencies.push(resolved);
        }
      }
    }

    forward.set(file, unique(dependencies));
  }

  for (const [file, dependencies] of forward.entries()) {
    for (const dependency of dependencies) {
      const current = reverse.get(dependency) ?? [];
      current.push(file);
      reverse.set(dependency, unique(current));
    }
  }

  const result = {};
  const visited = new Set();

  function collectImpacted(file) {
    if (visited.has(file)) {
      return [];
    }

    visited.add(file);
    const directDependents = reverse.get(file) ?? [];
    const transitiveDependents = directDependents.flatMap((dependent) => collectImpacted(dependent));
    visited.delete(file);
    return unique([...directDependents, ...transitiveDependents]);
  }

  for (const file of files) {
    const relativeFile = path.relative(repoPath, file);
    result[relativeFile] = {
      directDependents: (reverse.get(file) ?? []).map((entry) => path.relative(repoPath, entry)).sort(),
      impactedFiles: collectImpacted(file).map((entry) => path.relative(repoPath, entry)).sort(),
    };
    result[relativeFile].blastRadiusCount = result[relativeFile].impactedFiles.length;
  }

  return result;
}
