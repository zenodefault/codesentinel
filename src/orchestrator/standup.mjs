import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { promptLlm } from "../llm/client.mjs";
import { getRepoMemoryPaths, readMemoryJson, readModulePassports } from "../memory/memory.mjs";

const execFileAsync = promisify(execFile);

async function getGitCommits(repoPath, days = 1) {
  const { stdout } = await execFileAsync(
    "git",
    ["log", `--since=${days} days ago`, "--pretty=format:%H|%an|%ae|%s", "--name-only"],
    { cwd: repoPath },
  );

  const commits = [];
  let currentCommit = null;

  for (const line of stdout.split("\n")) {
    if (line.includes("|")) {
      const [hash, author, email, subject] = line.split("|");
      currentCommit = { hash, author, email, subject, files: [] };
      commits.push(currentCommit);
    } else if (line.trim() && currentCommit) {
      currentCommit.files.push(line.trim());
    }
  }

  return commits;
}

export async function generateStandupReport({ repoName, repoPath, days = 1 }) {
  const commits = await getGitCommits(repoPath, days);
  if (commits.length === 0) return null;

  const memory = await getRepoMemoryPaths(repoName);
  const blastRadius = await readMemoryJson(memory.blastRadiusMap);
  const passports = await readModulePassports(repoName);

  const authorActivity = new Map();

  for (const commit of commits) {
    if (!authorActivity.has(commit.email)) {
      authorActivity.set(commit.email, { author: commit.author, commits: [], impact: [] });
    }
    const act = authorActivity.get(commit.email);
    act.commits.push(commit.subject);

    for (const file of commit.files) {
      const impactedCount = blastRadius.files?.[file]?.impactedBy?.length || 0;
      const passport = passports.find((p) => {
        const moduleKey = p.module.toLowerCase();
        const pathKey = file.toLowerCase();
        return pathKey.includes(moduleKey) || moduleKey.includes(pathKey);
      });

      act.impact.push({
        file,
        impactedCount,
        module: passport?.module || "Unknown",
        risk: passport?.riskSummary || "Standard module."
      });
    }
  }

  const authorsSummary = Array.from(authorActivity.entries()).map(([email, data]) => ({
    email,
    ...data,
  }));

  const prompt = `Summarize the following team activity for a daily standup. 
    Focus on the "Blast Radius" (impactedCount) and "Module Risk".
    Highlight high-impact changes that might need extra testing.
    
    Data: ${JSON.stringify(authorsSummary)}
    
    Format:
    ## 🚀 Team Impact Summary
    [A 2-3 sentence overview of the day's risk profile]
    
    ## 👤 [Author Name]
    - **Work:** [Concise summary of commits]
    - **Impact:** [Explain the impact on specific modules using blast radius data]`;

  let aiSummary = "AI summary unavailable or provider error.";

  try {
    aiSummary = await promptLlm(prompt, { max_tokens: 1000 });
  } catch (error) {
    aiSummary = `AI summary error: ${error.message}`;
  }

  return {
    repoName,
    date: new Date().toISOString().split("T")[0],
    authorsSummary,
    aiSummary
  };
}
