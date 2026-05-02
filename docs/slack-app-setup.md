# Slack App Setup

CodeSentinel expects a Slack app with these slash commands:

- `/sentinel`
- `/scan`
- `/why`

Point each Request URL at the local server:

- `POST /slack/commands`

## Required Environment Variables

- `SLACK_SIGNING_SECRET`
- `SLACK_BOT_TOKEN`
- `SLACK_WEBHOOK_URL`
- `SLACK_CHANNEL_ID`
- `SLACK_REPORT_CHANNEL` (optional override for DOCX delivery)
- `CODESENTINEL_BASE_URL` or `CODESENTINEL_DASHBOARD_URL`

## Suggested Command Usage

- `/sentinel register https://github.com/org/repo.git`
- `/scan repo`
- `/why src/server/run-server.mjs`

## Local Verification

1. Start the server with `npm run server:start`.
2. Open `http://localhost:3000/`.
3. Send a signed POST to `/slack/commands` and confirm JSON Block Kit responses return.
