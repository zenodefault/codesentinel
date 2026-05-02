# Dev 2 Implementation Notes

## Environment
- `GITHUB_TOKEN`
- `GITHUB_WEBHOOK_SECRET`
- `SLACK_WEBHOOK_URL`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM`
- `PORT` (optional, default `8787`)

## Endpoints
- `POST /webhook/github`
- `POST /webhook/twilio/whatsapp`
- `GET /health`

## GitHub Webhook
Configure repository webhook to point to:
- `https://<host>/webhook/github`

Enable event:
- Pull requests

## Triggered Flows
- PR opened/synchronized/reopened -> runs `pr-premortem` pipeline and posts/updates PR comment.
- `file_edited` synthetic event -> sends blast radius warning to Slack.
- Twilio WhatsApp reply `YES` -> marks draft PR ready for review.

## CLI
- `npm run webhooks:start`
- `npm run pr-premortem -- --repo <memory_repo_slug> --repo-full-name owner/repo --pr <number> --fetch-from-github`
- `npm run auto-fix -- --repo <local_repo_path> --repo-full-name owner/repo --ecosystem npm --dependency <name> --cve CVE-XXXX-YYYY`
- `npm run auto-fix:e2e`
