import { IncomingWebhook } from "@slack/webhook";

function truncate(text, max = 180) {
  if (!text) {
    return "No summary available.";
  }

  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function advisoryId(dependency) {
  const advisory = dependency.advisories.find((item) => item.cveId) ?? dependency.advisories[0];
  return advisory?.cveId ?? advisory?.id ?? "unknown-advisory";
}

export function buildCriticalDependencyBlocks(repoName, dependency) {
  const advisory = dependency.advisories.find((item) => item.cvssBaseScore) ?? dependency.advisories[0] ?? {};

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Critical dependency risk in ${repoName}`,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Dependency*\n${dependency.name}`,
        },
        {
          type: "mrkdwn",
          text: `*Risk level*\n${dependency.riskLevel}`,
        },
        {
          type: "mrkdwn",
          text: `*Advisory*\n${advisoryId(dependency)}`,
        },
        {
          type: "mrkdwn",
          text: `*CVSS*\n${dependency.cvssBaseScore ?? advisory.cvssBaseScore ?? "n/a"}`,
        },
        {
          type: "mrkdwn",
          text: `*Blast radius*\n${dependency.blastRadius.importCount} file(s)`,
        },
        {
          type: "mrkdwn",
          text: `*ActualRisk*\n${dependency.actualRisk}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Summary*\n${truncate(advisory.summary)}`,
      },
    },
  ];
}

export async function sendSlackBlocks(blocks, text) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      sent: false,
      warning: "SLACK_WEBHOOK_URL is not configured; Slack alert was skipped.",
    };
  }

  const webhook = new IncomingWebhook(webhookUrl);
  await webhook.send({ text, blocks });

  return { sent: true, warning: null };
}
