# Module Passport - src/server/run-server.mjs

Module-level operational context for src/server/run-server.mjs in codesentinel.

```json
{
  "module": "src/server/run-server.mjs",
  "generatedAt": "2026-05-08T18:01:58.371Z",
  "whatItDoes": "Implements run-server.mjs and coordinates repository logic for src/server.",
  "blastRadiusScore": 0,
  "blastRadius": {
    "directDependents": [],
    "impactedFiles": [],
    "blastRadiusCount": 0
  },
  "ghostAuthors": [
    {
      "repo": "codesentinel",
      "filePath": "src/server/run-server.mjs",
      "email": "chanducharan8183@gmail.com",
      "loginHint": "chanducharan8183",
      "lastCommitDate": "2026-05-03T01:25:59+05:30",
      "commitCount": 1,
      "files": [
        "src/server/run-server.mjs"
      ],
      "matchingStrategy": "git-email-local-part-vs-github-login"
    }
  ],
  "ownership": {
    "filePath": "src/server/run-server.mjs",
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
        "reason": "1 commit(s) on src/server/run-server.mjs, last touched 2026-05-03T01:25:59+05:30.",
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
  "keyDecisions": [],
  "dependencyStatus": [],
  "riskSummary": "### Summary of Module Risk for Engineers\n\n**Module Overview:**\n- The module in question is `run-server.mjs`, which is responsible for coordinating repository logic in the server directory of the project.\n\n**Why It Matters:**\n- Understanding this module is crucial because it plays a key role in the server's functionality. Any issues or changes here could potentially affect the server's performance or behavior, even though it currently has a low blast radius score (0). This means it doesn't directly impact other parts of the codebase or have any dependents, which reduces immediate risk.\n\n**What to Review First:**\n1. **Ownership and Authors:**\n   - The module has only one historical author, Hemanth Kumar VJ, who made a single commit. Since the confidence in ownership is low, it’s important to verify if this author is still involved or if there are other team members who should be consulted for insights or context.\n\n2. **Recent Changes:**\n   - The last commit was made on May 3, 2026. Review this commit to understand what changes were made and why. This will help assess if the changes align with current project goals and standards.\n\n3. **Code Quality and Documentation:**\n   - Since there are no direct dependents or impacted files, focus on the quality of the code within `run-server.mjs`. Ensure that it is well-documented and adheres to coding standards, as this will facilitate easier maintenance and updates in the future.",
  "warnings": [
    "Jira credentials are not configured; ticket enrichment was skipped.",
    "GitHub org lookup skipped because org or GITHUB_TOKEN is missing."
  ]
}
```
