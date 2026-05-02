import { sendSlackBlocks } from "./slack.mjs";

const COLORS = {
  LOW: "#2eb886",
  MEDIUM: "#daa038",
  HIGH: "#e67e22",
  CRITICAL: "#d40e0d",
};

export async function sendCveAlertMessage({ repoName, dependency, cveId, actualRisk, severity, prUrl }) {
  const color = COLORS[severity] ?? COLORS.HIGH;
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${severity} CVE Alert* in *${repoName}*`,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Dependency*\n${dependency}` },
        { type: "mrkdwn", text: `*CVE*\n${cveId}` },
        { type: "mrkdwn", text: `*ActualRisk*\n${actualRisk}` },
        { type: "mrkdwn", text: `*Severity*\n${severity}` },
      ],
    },
    {
      type: "context",
      elements: [{ type: "mrkdwn", text: prUrl ? `<${prUrl}|Auto-fix PR>` : "Auto-fix PR not created." }],
    },
  ];

  return sendSlackBlocks(blocks, `${severity} CVE alert for ${dependency}`);
}

export async function sendAutoFixFailureMessage({ repoName, dependency, cveId, stderr }) {
  const trimmed = String(stderr ?? "").trim();
  const excerpt = trimmed.length > 1400 ? `${trimmed.slice(0, 1400)}\n...` : trimmed;
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Auto-fix Build Failed* for *${repoName}*`,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Dependency*\n${dependency}` },
        { type: "mrkdwn", text: `*CVE*\n${cveId}` },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Error log excerpt*\n\`\`\`${excerpt || "No stderr captured."}\`\`\``,
      },
    },
  ];

  return sendSlackBlocks(blocks, `Auto-fix failed for ${dependency}`);
}

export async function sendBlastRadiusWarning({ repoName, filePath, impactedCount }) {
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Blast Radius Warning* in *${repoName}*`,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*File edited*\n${filePath}` },
        { type: "mrkdwn", text: `*Impacted files*\n${impactedCount}` },
      ],
    },
  ];

  return sendSlackBlocks(blocks, `Blast radius warning for ${filePath}`);
}

export function severityColor(level) {
  return COLORS[level] ?? "#666666";
}
