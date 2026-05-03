import { readFile } from "node:fs/promises";
import path from "node:path";

const CODEOWNERS_CANDIDATES = [".github/CODEOWNERS", "CODEOWNERS", "docs/CODEOWNERS"];

function normalizeFilePath(filePath) {
  return filePath.replace(/\\/g, "/").replace(/^\.?\//, "");
}

function escapeRegex(value) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
}

function codeownersPatternToRegex(pattern) {
  const normalized = normalizeFilePath(pattern.trim());
  const anchored = pattern.startsWith("/");
  const directoryOnly = normalized.endsWith("/");
  const body = directoryOnly ? normalized.slice(0, -1) : normalized;
  const slashAware = body.includes("/");
  let regexSource = "";

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];
    const next = body[index + 1];

    if (char === "*" && next === "*") {
      regexSource += ".*";
      index += 1;
      continue;
    }

    if (char === "*") {
      regexSource += "[^/]*";
      continue;
    }

    if (char === "?") {
      regexSource += "[^/]";
      continue;
    }

    regexSource += escapeRegex(char);
  }

  if (directoryOnly) {
    regexSource = regexSource ? `${regexSource}(?:/.*)?` : ".*";
  }

  if (!slashAware) {
    regexSource = `(?:^|.*/)${regexSource}`;
  } else if (!anchored) {
    regexSource = `(?:^|.*/)${regexSource}`;
  } else {
    regexSource = `^${regexSource}`;
  }

  return new RegExp(`${regexSource}$`);
}

async function loadCodeowners(repoPath) {
  for (const relativePath of CODEOWNERS_CANDIDATES) {
    try {
      const contents = await readFile(path.join(repoPath, relativePath), "utf8");
      return {
        path: relativePath,
        contents,
      };
    } catch {
      continue;
    }
  }

  return null;
}

function parseCodeowners(contents) {
  return contents
    .split(/\r?\n/)
    .map((line, index) => ({ line: line.trim(), lineNumber: index + 1 }))
    .filter(({ line }) => line && !line.startsWith("#"))
    .map(({ line, lineNumber }) => {
      const [pattern, ...owners] = line.split(/\s+/);
      return {
        pattern,
        owners,
        lineNumber,
        regex: codeownersPatternToRegex(pattern),
      };
    })
    .filter((entry) => entry.pattern && entry.owners.length);
}

function parseOwnerToken(owner) {
  if (owner.startsWith("@") && owner.includes("/")) {
    const [, org, team] = owner.match(/^@([^/]+)\/(.+)$/) ?? [];
    return {
      raw: owner,
      type: "team",
      label: owner,
      org: org ?? null,
      team: team ?? null,
    };
  }

  if (owner.startsWith("@")) {
    return {
      raw: owner,
      type: "user",
      label: owner,
      login: owner.slice(1),
    };
  }

  if (owner.includes("@")) {
    return {
      raw: owner,
      type: "email",
      label: owner,
      email: owner.toLowerCase(),
    };
  }

  return {
    raw: owner,
    type: "unknown",
    label: owner,
  };
}

function summarizeContacts(entries) {
  const seen = new Set();
  const contacts = [];

  for (const entry of entries) {
    const key = `${entry.type}:${entry.label.toLowerCase()}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    contacts.push(entry);
  }

  return contacts;
}

function inferOwnersFromHistory(filePath, commits) {
  const authorStats = new Map();

  for (const commit of commits) {
    const email = commit.authorEmail.toLowerCase();
    const current = authorStats.get(email) ?? {
      type: "historical-author",
      label: commit.authorName ? `${commit.authorName} <${email}>` : email,
      email,
      commitCount: 0,
      lastAuthoredAt: commit.authoredAt,
      reason: `Touched ${filePath} in git history.`,
    };

    current.commitCount += 1;
    if (current.lastAuthoredAt < commit.authoredAt) {
      current.lastAuthoredAt = commit.authoredAt;
    }

    authorStats.set(email, current);
  }

  return [...authorStats.values()]
    .sort((left, right) => {
      if (right.commitCount !== left.commitCount) {
        return right.commitCount - left.commitCount;
      }

      return String(right.lastAuthoredAt).localeCompare(String(left.lastAuthoredAt));
    })
    .map((entry, index) => ({
      ...entry,
      confidence: index === 0 && entry.commitCount > 1 ? "medium" : "low",
    }));
}

function buildOwnershipResult({ filePath, codeowners, historyOwners }) {
  const suggestedContacts = [];
  let likelyTeam = null;
  let primaryOwner = null;

  if (codeowners?.owners?.length) {
    const parsedOwners = codeowners.owners.map(parseOwnerToken);

    for (const owner of parsedOwners) {
      suggestedContacts.push({
        label: owner.label,
        type: owner.type,
        source: "CODEOWNERS",
        confidence: "high",
        reason: `Matched CODEOWNERS rule ${codeowners.pattern}.`,
      });
    }

    const firstTeam = parsedOwners.find((entry) => entry.type === "team");
    if (firstTeam) {
      likelyTeam = {
        name: firstTeam.label,
        source: "CODEOWNERS",
        confidence: "high",
      };
    }

    const firstDirectOwner = parsedOwners.find((entry) => entry.type === "user" || entry.type === "email") ?? firstTeam ?? parsedOwners[0];
    if (firstDirectOwner) {
      primaryOwner = {
        label: firstDirectOwner.label,
        type: firstDirectOwner.type,
        source: "CODEOWNERS",
        confidence: "high",
      };
    }
  }

  for (const entry of historyOwners.slice(0, 3)) {
    suggestedContacts.push({
      label: entry.label,
      type: entry.type,
      source: "git-history",
      confidence: entry.confidence,
      reason: `${entry.commitCount} commit(s) on ${filePath}, last touched ${entry.lastAuthoredAt}.`,
      commitCount: entry.commitCount,
      lastAuthoredAt: entry.lastAuthoredAt,
      email: entry.email,
    });
  }

  if (!primaryOwner && historyOwners[0]) {
    primaryOwner = {
      label: historyOwners[0].label,
      type: historyOwners[0].type,
      source: "git-history",
      confidence: historyOwners[0].confidence,
    };
  }

  return {
    filePath,
    coverage: codeowners?.owners?.length ? "explicit" : historyOwners.length ? "inferred" : "unknown",
    codeowners: codeowners
      ? {
          file: codeowners.file,
          pattern: codeowners.pattern,
          lineNumber: codeowners.lineNumber,
          owners: codeowners.owners,
        }
      : null,
    likelyTeam,
    primaryOwner,
    suggestedContacts: summarizeContacts(suggestedContacts),
    ownershipSignals: {
      codeownersOwners: codeowners?.owners?.length ?? 0,
      historicalAuthors: historyOwners.length,
    },
  };
}

export async function inferOwnership({ repoPath, filePath, commits }) {
  const normalizedFilePath = normalizeFilePath(filePath);
  const loadedCodeowners = await loadCodeowners(repoPath);
  let matchedRule = null;

  if (loadedCodeowners) {
    const parsed = parseCodeowners(loadedCodeowners.contents);
    matchedRule =
      parsed
        .filter((entry) => entry.regex.test(normalizedFilePath))
        .at(-1) ?? null;

    if (matchedRule) {
      matchedRule = {
        ...matchedRule,
        file: loadedCodeowners.path,
      };
    }
  }

  const historyOwners = inferOwnersFromHistory(normalizedFilePath, commits);

  return buildOwnershipResult({
    filePath: normalizedFilePath,
    codeowners: matchedRule,
    historyOwners,
  });
}
