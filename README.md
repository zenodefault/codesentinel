# CodeSentinel: Proactive Repository Guardian

CodeSentinel is an AI-powered repository analyzer and automated remediation engine designed for the Samsung PRISM Hackathon. It bridges the gap between security alerts and developer action by combining dependency intelligence with historical git archaeology.

## 🔴 The Problem
Modern engineering teams face three critical "blind spots":
1. **Dependency Rot:** CVEs are buried in transitive dependencies that developers rarely check manually.
2. **Context Loss (Ghost Authors):** When senior engineers leave, the "why" behind critical code decisions is lost, making it dangerous to refactor or fix bugs.
3. **Remediation Toil:** Fixing a vulnerability often takes hours of manual manifest patching, build testing, and PR coordination.

## 🟢 The Solution
CodeSentinel acts as a **Senior Engineering Guardian** that:
- **Scouts:** Automatically sweeps for CVEs and calculates an `ActualRisk` score based on usage frequency (Blast Radius).
- **Remembers:** Uses **Git Archaeology** to link commits to Jira tickets and identify "Ghost Authors" who no longer work at the company.
- **Acts:** Autonomously patches manifests, validates them in Docker sandboxes, and opens Draft PRs for review.
- **Coordinates:** Connects with teams via **Slack** (for daily alerts) and **WhatsApp** (for critical mobile approvals).

## 🛠️ Setup
CodeSentinel requires **Node.js ≥ 22.14.0** and **OpenClaw**.

1. **Clone & Install:**
   ```bash
   git clone <repo-url>
   cd codesentinel
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file with the following:
   ```env
   # Integration Tokens
   GITHUB_TOKEN=your_token
   SLACK_BOT_TOKEN=xoxb-...
   SLACK_SIGNING_SECRET=your_secret
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
   
   # Optional: WhatsApp via Twilio
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   
   # Server Config
   PORT=3000
   CODESENTINEL_BASE_URL=http://localhost:3000
   ```

## 📋 Instructions
To run the full CodeSentinel suite, you need to start the dashboard server and the webhook listener.

1. **Start the Dashboard & Slack Handler:**
   ```bash
   npm run server:start
   ```
   *Access the Live Canvas at `http://localhost:3000`*

2. **Start the GitHub Webhook Listener:**
   ```bash
   npm run webhooks:start
   ```
   *(Note: Use `ngrok` or similar to expose this port for GitHub Webhooks)*

3. **Initialize the Agent:**
   ```bash
   npm run openclaw:setup
   ```

## 🚀 Usage

### Slack Slash Commands
- `/sentinel register {repo_url}`: Registers a new repository for monitoring and triggers an initial scan.
- `/scan {repo_name}`: Triggers an on-demand CVE sweep for a tracked repository.
- `/why {file_path}`: Generates a **Module Passport** showing ownership, historical Jira decisions, and blast radius.

### Automation Flow
1. **Daily Sweeps:** Every morning, CodeSentinel scans all repos and alerts Slack if a critical CVE is found.
2. **Auto-Fix:** If a CRITICAL risk is found, a Docker-validated Draft PR is opened automatically.
3. **PR Pre-mortem:** Whenever a developer opens a PR, CodeSentinel comments with a "Blast Radius" report to warn about high-impact changes.
4. **WhatsApp Approval:** Tech leads receive a WhatsApp message for critical patches; replying `YES` marks the PR as ready for review.

### Weekly Reports
Every Monday at 9 AM, a comprehensive `.docx` report is generated and uploaded to the `#security-ops` Slack channel, summarizing the team's health and any overdue security deferrals.
