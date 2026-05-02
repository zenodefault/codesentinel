import { IncomingWebhook } from "@slack/webhook";
import { readFile } from "node:fs/promises";
import { buildCriticalDependencyBlocks } from "../slack/blocks.mjs";

export { buildCriticalDependencyBlocks };

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

export async function postSlackMessage({ channel, text, blocks }) {
  const token = process.env.SLACK_BOT_TOKEN;

  if (!token || !channel) {
    return {
      sent: false,
      warning: "SLACK_BOT_TOKEN or channel is not configured; Slack chat.postMessage was skipped.",
    };
  }

  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      channel,
      text,
      blocks,
    }),
  });
  const payload = await response.json();

  if (!payload.ok) {
    throw new Error(`Slack chat.postMessage failed: ${payload.error ?? response.status}`);
  }

  return {
    sent: true,
    channel: payload.channel,
    ts: payload.ts,
  };
}

export async function uploadSlackFile({ channel, filePath, filename, title, initialComment }) {
  const token = process.env.SLACK_BOT_TOKEN;

  if (!token || !channel) {
    return {
      sent: false,
      warning: "SLACK_BOT_TOKEN or channel is not configured; Slack files upload was skipped.",
    };
  }

  const form = new FormData();
  const file = new Blob([await readFile(filePath)]);

  form.set("channels", channel);
  form.set("filename", filename);
  form.set("title", title ?? filename);
  if (initialComment) {
    form.set("initial_comment", initialComment);
  }
  form.set("file", file, filename);

  const response = await fetch("https://slack.com/api/files.upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  const payload = await response.json();

  if (!payload.ok) {
    throw new Error(`Slack files.upload failed: ${payload.error ?? response.status}`);
  }

  return {
    sent: true,
    file: payload.file,
  };
}
