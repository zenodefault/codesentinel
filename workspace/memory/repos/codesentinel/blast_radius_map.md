# Blast Radius Map

Reverse dependency map for codesentinel.

```json
{
  "repo": "codesentinel",
  "updatedAt": "2026-05-03T13:06:43.867Z",
  "files": {
    "scripts/lint-workspace.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/analysis/file-blast-radius.mjs": {
      "directDependents": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "impactedFiles": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/cli/codesentinel.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/auto-fix/docker-sim.mjs": {
      "directDependents": [
        "src/auto-fix/run-auto-fix.mjs"
      ],
      "impactedFiles": [
        "src/auto-fix/run-auto-fix.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/auto-fix/e2e-autofix-test.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/auto-fix/license-check.mjs": {
      "directDependents": [
        "src/auto-fix/run-auto-fix.mjs"
      ],
      "impactedFiles": [
        "src/auto-fix/run-auto-fix.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/auto-fix/manifest.mjs": {
      "directDependents": [
        "src/auto-fix/run-auto-fix.mjs"
      ],
      "impactedFiles": [
        "src/auto-fix/run-auto-fix.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/auto-fix/run-auto-fix.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/cve-sweep/advisories.mjs": {
      "directDependents": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/cve-sweep/blast-radius.mjs": {
      "directDependents": [
        "src/cve-sweep/scoring.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/cve-sweep/scoring.mjs"
      ],
      "blastRadiusCount": 2
    },
    "src/cve-sweep/graph.mjs": {
      "directDependents": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/cve-sweep/maintenance.mjs": {
      "directDependents": [
        "src/cve-sweep/scoring.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/cve-sweep/scoring.mjs"
      ],
      "blastRadiusCount": 2
    },
    "src/cve-sweep/manifest.mjs": {
      "directDependents": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/cve-sweep/repo-source.mjs": {
      "directDependents": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/cve-sweep/run-cve-sweep.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/cve-sweep/scoring.mjs": {
      "directDependents": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/git-archaeologist/ghost-authors.mjs": {
      "directDependents": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "impactedFiles": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/git-archaeologist/git-history.mjs": {
      "directDependents": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "impactedFiles": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/git-archaeologist/jira.mjs": {
      "directDependents": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "impactedFiles": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/git-archaeologist/module-passport.mjs": {
      "directDependents": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "impactedFiles": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/git-archaeologist/ownership.mjs": {
      "directDependents": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "impactedFiles": [
        "src/git-archaeologist/run-git-archaeologist.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/git-archaeologist/run-git-archaeologist.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/heartbeat/load-heartbeat.mjs": {
      "directDependents": [
        "src/heartbeat/validate-heartbeat.mjs",
        "src/orchestrator/run-heartbeat-trigger.mjs"
      ],
      "impactedFiles": [
        "src/heartbeat/validate-heartbeat.mjs",
        "src/orchestrator/run-heartbeat-trigger.mjs"
      ],
      "blastRadiusCount": 2
    },
    "src/heartbeat/validate-heartbeat.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/integrations/github.mjs": {
      "directDependents": [
        "src/auto-fix/run-auto-fix.mjs",
        "src/pr-premortem/run-pr-premortem.mjs",
        "src/server/webhooks.mjs"
      ],
      "impactedFiles": [
        "src/auto-fix/run-auto-fix.mjs",
        "src/pr-premortem/run-pr-premortem.mjs",
        "src/server/webhooks.mjs"
      ],
      "blastRadiusCount": 3
    },
    "src/integrations/slack-notify.mjs": {
      "directDependents": [
        "src/auto-fix/run-auto-fix.mjs",
        "src/server/webhooks.mjs"
      ],
      "impactedFiles": [
        "src/auto-fix/run-auto-fix.mjs",
        "src/server/webhooks.mjs"
      ],
      "blastRadiusCount": 2
    },
    "src/integrations/slack.mjs": {
      "directDependents": [
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/integrations/slack-notify.mjs",
        "src/reports/run-weekly-report.mjs",
        "src/rot-report/run-rot-report.mjs"
      ],
      "impactedFiles": [
        "src/auto-fix/run-auto-fix.mjs",
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/integrations/slack-notify.mjs",
        "src/reports/run-weekly-report.mjs",
        "src/rot-report/run-rot-report.mjs",
        "src/server/webhooks.mjs"
      ],
      "blastRadiusCount": 6
    },
    "src/integrations/whatsapp-twilio.mjs": {
      "directDependents": [
        "src/auto-fix/run-auto-fix.mjs"
      ],
      "impactedFiles": [
        "src/auto-fix/run-auto-fix.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/memory/check-memory.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/memory/json-block.mjs": {
      "directDependents": [
        "src/memory/memory.mjs",
        "src/rot-report/aggregate.mjs",
        "src/server/dashboard-data.mjs"
      ],
      "impactedFiles": [
        "src/cli/codesentinel.mjs",
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/git-archaeologist/ghost-authors.mjs",
        "src/git-archaeologist/module-passport.mjs",
        "src/git-archaeologist/run-git-archaeologist.mjs",
        "src/memory/check-memory.mjs",
        "src/memory/memory.mjs",
        "src/orchestrator/route-command.mjs",
        "src/orchestrator/run-heartbeat-trigger.mjs",
        "src/pr-premortem/run-pr-premortem.mjs",
        "src/reports/run-weekly-report.mjs",
        "src/rot-report/aggregate.mjs",
        "src/rot-report/run-rot-report.mjs",
        "src/server/command-handlers.mjs",
        "src/server/dashboard-data.mjs",
        "src/server/run-server.mjs",
        "src/server/webhooks.mjs"
      ],
      "blastRadiusCount": 17
    },
    "src/memory/memory.mjs": {
      "directDependents": [
        "src/cli/codesentinel.mjs",
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/git-archaeologist/ghost-authors.mjs",
        "src/git-archaeologist/module-passport.mjs",
        "src/git-archaeologist/run-git-archaeologist.mjs",
        "src/memory/check-memory.mjs",
        "src/orchestrator/run-heartbeat-trigger.mjs",
        "src/pr-premortem/run-pr-premortem.mjs",
        "src/rot-report/aggregate.mjs",
        "src/server/command-handlers.mjs",
        "src/server/dashboard-data.mjs",
        "src/server/webhooks.mjs"
      ],
      "impactedFiles": [
        "src/cli/codesentinel.mjs",
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/git-archaeologist/ghost-authors.mjs",
        "src/git-archaeologist/module-passport.mjs",
        "src/git-archaeologist/run-git-archaeologist.mjs",
        "src/memory/check-memory.mjs",
        "src/orchestrator/route-command.mjs",
        "src/orchestrator/run-heartbeat-trigger.mjs",
        "src/pr-premortem/run-pr-premortem.mjs",
        "src/reports/run-weekly-report.mjs",
        "src/rot-report/aggregate.mjs",
        "src/rot-report/run-rot-report.mjs",
        "src/server/command-handlers.mjs",
        "src/server/dashboard-data.mjs",
        "src/server/run-server.mjs",
        "src/server/webhooks.mjs"
      ],
      "blastRadiusCount": 16
    },
    "src/orchestrator/route-command.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/orchestrator/run-heartbeat-trigger.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/pr-premortem/card.mjs": {
      "directDependents": [
        "src/pr-premortem/run-pr-premortem.mjs"
      ],
      "impactedFiles": [
        "src/pr-premortem/run-pr-premortem.mjs",
        "src/server/webhooks.mjs"
      ],
      "blastRadiusCount": 2
    },
    "src/pr-premortem/run-pr-premortem.mjs": {
      "directDependents": [
        "src/server/webhooks.mjs"
      ],
      "impactedFiles": [
        "src/server/webhooks.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/reports/docx_builder.py": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/reports/run-weekly-report.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/rot-report/aggregate.mjs": {
      "directDependents": [
        "src/orchestrator/run-heartbeat-trigger.mjs",
        "src/reports/run-weekly-report.mjs",
        "src/rot-report/run-rot-report.mjs",
        "src/server/dashboard-data.mjs"
      ],
      "impactedFiles": [
        "src/orchestrator/run-heartbeat-trigger.mjs",
        "src/reports/run-weekly-report.mjs",
        "src/rot-report/run-rot-report.mjs",
        "src/server/dashboard-data.mjs",
        "src/server/run-server.mjs"
      ],
      "blastRadiusCount": 5
    },
    "src/rot-report/run-rot-report.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/server/command-handlers.mjs": {
      "directDependents": [
        "src/orchestrator/route-command.mjs",
        "src/server/run-server.mjs"
      ],
      "impactedFiles": [
        "src/orchestrator/route-command.mjs",
        "src/server/run-server.mjs"
      ],
      "blastRadiusCount": 2
    },
    "src/server/dashboard-data.mjs": {
      "directDependents": [
        "src/server/run-server.mjs"
      ],
      "impactedFiles": [
        "src/server/run-server.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/server/dashboard-html.mjs": {
      "directDependents": [
        "src/server/run-server.mjs"
      ],
      "impactedFiles": [
        "src/server/run-server.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/server/run-server.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/server/webhooks.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/slack/blocks.mjs": {
      "directDependents": [
        "src/integrations/slack.mjs",
        "src/rot-report/run-rot-report.mjs",
        "src/server/command-handlers.mjs"
      ],
      "impactedFiles": [
        "src/auto-fix/run-auto-fix.mjs",
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/integrations/slack-notify.mjs",
        "src/integrations/slack.mjs",
        "src/orchestrator/route-command.mjs",
        "src/reports/run-weekly-report.mjs",
        "src/rot-report/run-rot-report.mjs",
        "src/server/command-handlers.mjs",
        "src/server/run-server.mjs",
        "src/server/webhooks.mjs"
      ],
      "blastRadiusCount": 10
    },
    "src/slack/signatures.mjs": {
      "directDependents": [
        "src/server/run-server.mjs"
      ],
      "impactedFiles": [
        "src/server/run-server.mjs"
      ],
      "blastRadiusCount": 1
    }
  }
}
```
