# Decision History

Git and ticket-derived decision context for codesentinel.

```json
{
  "repo": "codesentinel",
  "updatedAt": "2026-05-03T13:06:43.867Z",
  "decisions": [
    {
      "filePath": "README.md",
      "commitCount": 1,
      "commits": [
        {
          "commitHash": "f5e21289495b1f941555f92c7ce1b04dfa669e86",
          "subject": "first commit",
          "authorEmail": "zenobot99@gmail.com",
          "authoredAt": "2026-05-02T23:06:41+05:30",
          "ticketIds": []
        }
      ],
      "jiraIssues": [],
      "ghostAuthors": [
        {
          "repo": "codesentinel",
          "filePath": "README.md",
          "email": "zenobot99@gmail.com",
          "loginHint": "zenobot99",
          "lastCommitDate": "2026-05-02T23:06:41+05:30",
          "commitCount": 1,
          "files": [
            "README.md"
          ],
          "matchingStrategy": "git-email-local-part-vs-github-login"
        }
      ],
      "ghostOwnershipRisk": "HIGH",
      "warnings": [
        "Jira credentials are not configured; ticket enrichment was skipped.",
        "GitHub org lookup skipped because org or GITHUB_TOKEN is missing."
      ]
    },
    {
      "filePath": "src/git-archaeologist/run-git-archaeologist.mjs",
      "commitCount": 3,
      "commits": [
        {
          "commitHash": "7aaedf9e014bf08204f6e82224c3197bd9e382c6",
          "subject": "Task 11: identify ghost authors",
          "authorEmail": "zenobot99@gmail.com",
          "authoredAt": "2026-05-02T23:49:43+05:30",
          "ticketIds": []
        },
        {
          "commitHash": "0510eb2e3c9395a5f4f15a12feddcc695f408cee",
          "subject": "Task 10: enrich archaeology with Jira context",
          "authorEmail": "zenobot99@gmail.com",
          "authoredAt": "2026-05-02T23:48:43+05:30",
          "ticketIds": []
        },
        {
          "commitHash": "1bfd1da1b7182fe3dfcccd45ba8204dd7d8aa6b8",
          "subject": "Task 9: parse git archaeology history",
          "authorEmail": "zenobot99@gmail.com",
          "authoredAt": "2026-05-02T23:48:05+05:30",
          "ticketIds": []
        }
      ],
      "jiraIssues": [],
      "ghostAuthors": [
        {
          "repo": "codesentinel",
          "filePath": "src/git-archaeologist/run-git-archaeologist.mjs",
          "email": "zenobot99@gmail.com",
          "loginHint": "zenobot99",
          "lastCommitDate": "2026-05-02T23:49:43+05:30",
          "commitCount": 3,
          "files": [
            "src/git-archaeologist/run-git-archaeologist.mjs"
          ],
          "matchingStrategy": "git-email-local-part-vs-github-login"
        }
      ],
      "ghostOwnershipRisk": "HIGH",
      "warnings": [
        "Jira credentials are not configured; ticket enrichment was skipped.",
        "GitHub org lookup skipped because org or GITHUB_TOKEN is missing."
      ]
    },
    {
      "filePath": "src/cve-sweep/run-cve-sweep.mjs",
      "commitCount": 4,
      "commits": [
        {
          "commitHash": "d175967283f5c4387040a75379e99fb101242cf7",
          "subject": "Task 8: send critical CVE alerts to Slack",
          "authorEmail": "zenobot99@gmail.com",
          "authoredAt": "2026-05-02T23:47:17+05:30",
          "ticketIds": []
        },
        {
          "commitHash": "685b00c86cfc8ea9297e71f0cc5a1ead23ce637f",
          "subject": "Task 7: score dependency actual risk",
          "authorEmail": "zenobot99@gmail.com",
          "authoredAt": "2026-05-02T23:46:19+05:30",
          "ticketIds": []
        },
        {
          "commitHash": "86042a0af52b3dc89003388bb45a722f43bc0ee6",
          "subject": "Task 6: add transitive dependency graph",
          "authorEmail": "zenobot99@gmail.com",
          "authoredAt": "2026-05-02T23:44:53+05:30",
          "ticketIds": []
        },
        {
          "commitHash": "a6c3db84ece38c3ab22972131701b4c16ba3b0a7",
          "subject": "Task 5: build direct cve-sweep skill",
          "authorEmail": "zenobot99@gmail.com",
          "authoredAt": "2026-05-02T23:42:29+05:30",
          "ticketIds": []
        }
      ],
      "jiraIssues": [],
      "ghostAuthors": [
        {
          "repo": "codesentinel",
          "filePath": "src/cve-sweep/run-cve-sweep.mjs",
          "email": "zenobot99@gmail.com",
          "loginHint": "zenobot99",
          "lastCommitDate": "2026-05-02T23:47:17+05:30",
          "commitCount": 4,
          "files": [
            "src/cve-sweep/run-cve-sweep.mjs"
          ],
          "matchingStrategy": "git-email-local-part-vs-github-login"
        }
      ],
      "ghostOwnershipRisk": "HIGH",
      "warnings": [
        "Jira credentials are not configured; ticket enrichment was skipped.",
        "GitHub org lookup skipped because org or GITHUB_TOKEN is missing."
      ]
    },
    {
      "filePath": "src/server/dashboard-html.mjs",
      "commitCount": 1,
      "commits": [
        {
          "commitHash": "1b68b584acd2bae73104f675c4c9e3b49dd734f5",
          "subject": "Build Dev 3 Slack, rot-report, and dashboard foundation",
          "authorName": "Hemanth Kumar VJ",
          "authorEmail": "chanducharan8183@gmail.com",
          "authoredAt": "2026-05-03T01:25:59+05:30",
          "ticketIds": []
        }
      ],
      "jiraIssues": [],
      "ghostAuthors": [
        {
          "repo": "codesentinel",
          "filePath": "src/server/dashboard-html.mjs",
          "email": "chanducharan8183@gmail.com",
          "loginHint": "chanducharan8183",
          "lastCommitDate": "2026-05-03T01:25:59+05:30",
          "commitCount": 1,
          "files": [
            "src/server/dashboard-html.mjs"
          ],
          "matchingStrategy": "git-email-local-part-vs-github-login"
        }
      ],
      "ghostOwnershipRisk": "HIGH",
      "ownership": {
        "filePath": "src/server/dashboard-html.mjs",
        "coverage": "inferred",
        "codeowners": null,
        "likelyTeam": null,
        "primaryOwner": {
          "label": "Hemanth Kumar VJ <chanducharan8183@gmail.com>",
          "type": "historical-author",
          "source": "git-history",
          "confidence": "low"
        },
        "suggestedContacts": [
          {
            "label": "Hemanth Kumar VJ <chanducharan8183@gmail.com>",
            "type": "historical-author",
            "source": "git-history",
            "confidence": "low",
            "reason": "1 commit(s) on src/server/dashboard-html.mjs, last touched 2026-05-03T01:25:59+05:30.",
            "commitCount": 1,
            "lastAuthoredAt": "2026-05-03T01:25:59+05:30",
            "email": "chanducharan8183@gmail.com"
          }
        ],
        "ownershipSignals": {
          "codeownersOwners": 0,
          "historicalAuthors": 1
        }
      },
      "warnings": [
        "Jira credentials are not configured; ticket enrichment was skipped.",
        "GitHub org lookup skipped because org or GITHUB_TOKEN is missing."
      ]
    }
  ]
}
```
