---
timezone: "Asia/Kolkata"
defaultChannel: "Slack"
triggers:
  - id: "daily-cve-sweep"
    type: "cron"
    schedule: "0 8 * * *"
    skill: "cve-sweep"
    notify: "Slack"
    description: "Run a dependency vulnerability sweep across all registered repositories every day at 8:00 AM."
  - id: "weekly-rot-report"
    type: "cron"
    schedule: "0 9 * * 1"
    skill: "rot-report"
    notify: "WhatsApp"
    description: "Generate the weekly dependency rot report every Monday at 9:00 AM."
  - id: "pr-watch"
    type: "cron"
    schedule: "*/30 * * * *"
    skill: "pr-watch"
    notify: "Slack"
    description: "Check for pull request activity every 30 minutes."
  - id: "blast-radius-on-edit"
    type: "event"
    event: "file_edited"
    skill: "blast-radius-check"
    notify: "Slack"
    description: "Run an impact check whenever any tracked file is edited."
---

# CodeSentinel Heartbeat

Pi Engine should treat the frontmatter above as the source of truth for proactive execution.

## Runtime Rules

- Load this file at startup and schedule every declared trigger.
- Fail fast if a trigger is missing a `skill`, routing target, or schedule/event selector.
- Cron triggers should be scheduled in the declared `timezone`.
- Event triggers should subscribe immediately and dispatch the named skill with the event payload.
- Slack is the primary delivery surface for operational notifications.
- WhatsApp is reserved for the weekly rot report and urgent approval-driven flows.

## Response Contract

- If a scheduled task finds nothing actionable, emit a quiet success marker in logs only.
- If a task finds actionable risk, notify the configured channel with the shortest useful summary and a pointer to Durable Memory.
