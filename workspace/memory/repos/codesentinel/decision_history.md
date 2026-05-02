# Decision History

Git and ticket-derived decision context for codesentinel.

```json
{
  "repo": "codesentinel",
  "updatedAt": "2026-05-02T18:19:37.017Z",
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
    }
  ]
}
```
