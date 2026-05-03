import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const JIRA_TICKET_PATTERN = /\b[A-Z]+-\d+\b/g;

export async function parseGitHistory(repoPath, filePath) {
  const { stdout } = await execFileAsync(
    "git",
    ["log", "--follow", "--format=%H%x09%s%x09%an%x09%ae%x09%ad", "--date=iso-strict", "--", filePath],
    { cwd: repoPath },
  );

  return stdout
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [commitHash, subject, authorName, authorEmail, authoredAt] = line.split("\t");
      const ticketIds = subject.match(JIRA_TICKET_PATTERN) ?? [];

      return {
        commitHash,
        subject,
        authorName,
        authorEmail,
        authoredAt,
        ticketIds,
      };
    });
}
