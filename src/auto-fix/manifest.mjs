import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export async function patchNodeManifest(repoPath, dependency, newVersion) {
  const packagePath = path.join(repoPath, "package.json");
  const lockPath = path.join(repoPath, "package-lock.json");
  const pkg = JSON.parse(await readFile(packagePath, "utf8"));

  let oldVersion = null;
  if (pkg.dependencies?.[dependency]) {
    oldVersion = pkg.dependencies[dependency];
    pkg.dependencies[dependency] = newVersion;
  } else if (pkg.devDependencies?.[dependency]) {
    oldVersion = pkg.devDependencies[dependency];
    pkg.devDependencies[dependency] = newVersion;
  } else {
    throw new Error(`${dependency} not found in package.json`);
  }

  await writeFile(packagePath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");

  return {
    ecosystem: "npm",
    oldVersion,
    newVersion,
    changedFiles: [packagePath],
    lockPath,
  };
}

export async function patchPythonManifest(repoPath, dependency, newVersion) {
  const reqPath = path.join(repoPath, "requirements.txt");
  const raw = await readFile(reqPath, "utf8");
  const lines = raw.split(/\r?\n/);

  let oldVersion = null;
  const updated = lines.map((line) => {
    const trimmed = line.trim();
    const m = trimmed.match(/^([A-Za-z0-9._-]+)(==|>=|<=|~=|>|<)?(.+)?$/);
    if (!m) {
      return line;
    }
    const name = m[1];
    if (name.toLowerCase() !== dependency.toLowerCase()) {
      return line;
    }
    oldVersion = `${m[2] ?? ""}${m[3] ?? ""}`.trim() || "unpinned";
    return `${name}==${newVersion}`;
  });

  if (!oldVersion) {
    throw new Error(`${dependency} not found in requirements.txt`);
  }

  await writeFile(reqPath, `${updated.join("\n")}\n`, "utf8");

  return {
    ecosystem: "pip",
    oldVersion,
    newVersion,
    changedFiles: [reqPath],
  };
}
