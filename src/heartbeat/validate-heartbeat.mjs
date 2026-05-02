import { loadHeartbeatConfig } from "./load-heartbeat.mjs";

const REQUIRED_TRIGGERS = [
  {
    id: "daily-cve-sweep",
    type: "cron",
    schedule: "0 8 * * *",
    skill: "cve-sweep",
    notify: "Slack",
  },
  {
    id: "weekly-rot-report",
    type: "cron",
    schedule: "0 9 * * 1",
    skill: "rot-report",
    notify: "WhatsApp",
  },
  {
    id: "pr-watch",
    type: "cron",
    schedule: "*/30 * * * *",
    skill: "pr-watch",
    notify: "Slack",
  },
  {
    id: "blast-radius-on-edit",
    type: "event",
    event: "file_edited",
    skill: "blast-radius-check",
    notify: "Slack",
  },
];

function assertTrigger(actual, expected) {
  for (const [key, value] of Object.entries(expected)) {
    if (actual?.[key] !== value) {
      throw new Error(`Trigger "${expected.id}" expected ${key}=${value} but found ${actual?.[key] ?? "undefined"}.`);
    }
  }
}

try {
  const heartbeat = await loadHeartbeatConfig();

  if (heartbeat.timezone !== "Asia/Kolkata") {
    throw new Error(`Expected timezone Asia/Kolkata but found ${heartbeat.timezone ?? "undefined"}.`);
  }

  if (!Array.isArray(heartbeat.triggers)) {
    throw new Error("HEARTBEAT.md must define a triggers array.");
  }

  const byId = new Map(heartbeat.triggers.map((trigger) => [trigger.id, trigger]));

  for (const expected of REQUIRED_TRIGGERS) {
    assertTrigger(byId.get(expected.id), expected);
  }

  console.log(`Heartbeat validation passed for ${heartbeat.triggers.length} triggers.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
