import axios from "axios";
import { appendSharedMemory } from "../memory/memory.mjs";

function deriveOrg(ownerHint) {
  return ownerHint ?? process.env.GITHUB_ORG ?? null;
}

async function fetchOrgMembers(org) {
  if (!org || !process.env.GITHUB_TOKEN) {
    return {
      members: [],
      warnings: ["GitHub org lookup skipped because org or GITHUB_TOKEN is missing."],
    };
  }

  try {
    const response = await axios.get(`https://api.github.com/orgs/${org}/members`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    return {
      members: response.data.map((member) => member.login.toLowerCase()),
      warnings: [],
    };
  } catch (error) {
    return {
      members: [],
      warnings: [`Unable to fetch GitHub org members for ${org}: ${error.message}`],
    };
  }
}

export async function identifyGhostAuthors({ repoName, filePath, commits, ownerHint }) {
  const org = deriveOrg(ownerHint);
  const { members, warnings } = await fetchOrgMembers(org);
  const memberSet = new Set(members);
  const authorStats = new Map();

  for (const commit of commits) {
    const key = commit.authorEmail.toLowerCase();
    const current = authorStats.get(key) ?? {
      email: key,
      loginHint: key.split("@")[0],
      lastCommitDate: commit.authoredAt,
      commitCount: 0,
      files: new Set(),
    };

    current.commitCount += 1;
    current.files.add(filePath);
    current.lastCommitDate = current.lastCommitDate > commit.authoredAt ? current.lastCommitDate : commit.authoredAt;
    authorStats.set(key, current);
  }

  const ghostAuthors = [];
  let ghostCommitCount = 0;

  for (const stat of authorStats.values()) {
    const isMember = memberSet.has(stat.loginHint.toLowerCase());

    if (!isMember) {
      ghostCommitCount += stat.commitCount;
      const entry = {
        repo: repoName,
        filePath,
        email: stat.email,
        loginHint: stat.loginHint,
        lastCommitDate: stat.lastCommitDate,
        commitCount: stat.commitCount,
        files: [...stat.files],
        matchingStrategy: "git-email-local-part-vs-github-login",
      };

      ghostAuthors.push(entry);
      await appendSharedMemory("ghostAuthors", entry);
    }
  }

  const majorityGhostOwned = commits.length > 0 && ghostCommitCount / commits.length > 0.5;

  return {
    org,
    warnings,
    ghostAuthors,
    majorityGhostOwned,
    riskLevel: majorityGhostOwned ? "HIGH" : "LOW",
  };
}
