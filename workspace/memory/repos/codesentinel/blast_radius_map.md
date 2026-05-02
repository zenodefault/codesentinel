# Blast Radius Map

Reverse dependency map for codesentinel.

```json
{
  "repo": "codesentinel",
  "updatedAt": "2026-05-02T18:20:38.770Z",
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
    "src/git-archaeologist/run-git-archaeologist.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/heartbeat/load-heartbeat.mjs": {
      "directDependents": [
        "src/heartbeat/validate-heartbeat.mjs"
      ],
      "impactedFiles": [
        "src/heartbeat/validate-heartbeat.mjs"
      ],
      "blastRadiusCount": 1
    },
    "src/heartbeat/validate-heartbeat.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/memory/check-memory.mjs": {
      "directDependents": [],
      "impactedFiles": [],
      "blastRadiusCount": 0
    },
    "src/memory/memory.mjs": {
      "directDependents": [
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/git-archaeologist/ghost-authors.mjs",
        "src/git-archaeologist/run-git-archaeologist.mjs",
        "src/memory/check-memory.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs",
        "src/git-archaeologist/ghost-authors.mjs",
        "src/git-archaeologist/run-git-archaeologist.mjs",
        "src/memory/check-memory.mjs"
      ],
      "blastRadiusCount": 4
    },
    "src/integrations/slack.mjs": {
      "directDependents": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "impactedFiles": [
        "src/cve-sweep/run-cve-sweep.mjs"
      ],
      "blastRadiusCount": 1
    }
  }
}
```
