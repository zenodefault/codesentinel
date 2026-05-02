# CodeSentinel Hackathon Submission

## Theme

Theme 3 - Productivity Platforms

## Problem Statements

- Repository Analyzer and Build Feasibility Engine
- Legacy Codebase Archaeologist

## Architecture

Slack slash commands and GitHub/Twilio webhooks enter the CodeSentinel server. The server routes to `cve-sweep`, `git-archaeologist`, `pr-premortem`, `auto-fix`, and `rot-report`. Durable Memory in `workspace/memory/` is the system of record for dependency ledgers, blast radius maps, decision history, module passports, ghost authors, and upgrade deferrals. The Live Canvas dashboard and weekly DOCX reporting layer both read from the same memory store.

## User Stories

- As a tech lead, I can register a repository in Slack and immediately get a dependency risk baseline.
- As an engineer, I can ask `/why {file}` and recover change intent, blast radius, and ghost-owner risk without digging through logs manually.
- As a reviewer, I can receive auto-generated risk summaries and approval prompts before risky dependency fixes merge.

## Seven-Step User Journey

1. `/sentinel register {repo}`
2. Daily HEARTBEAT CVE sweep posts to Slack
3. File edit triggers blast radius analysis
4. PR open triggers Pre-mortem Card
5. CRITICAL CVE opens Draft fix PR
6. WhatsApp approval controls merge
7. Monday rot-report DOCX lands in Slack

## OpenClaw Variant

- Base OpenClaw
- Node.js >= 22

## External APIs

- Slack API: slash commands, incoming webhook, files upload
- GitHub API: repo clone metadata, advisory DB, PR comments, draft PRs
- Twilio WhatsApp API: approval loop
- NVD REST API v2.0: CVE lookups
- Jira REST API v3: decision reconstruction
- Anthropic Claude Sonnet 4: risk summaries

## Estimated Compute

- 2 CPU cores
- 4 GB RAM

## Notes

The demo should be run with the Live Canvas dashboard open beside Slack so judges can see memory-backed updates land in near real time.
