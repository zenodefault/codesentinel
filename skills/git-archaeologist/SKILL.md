# git-archaeologist

## Purpose

Reconstruct why a file changed by mining git history, linked ticket IDs, ownership drift, and downstream impact.

## Inputs

- `repoPath`: local repository path
- `filePath`: file path inside the repository

## Behavior

1. Run `git log --follow` for the target file.
2. Extract commit hash, subject, author email, authored date, and Jira ticket IDs.
3. Enrich the result with Jira summaries and org-membership checks when credentials are available.
4. Persist decision history, ghost-author data, and module passports into Durable Memory.

## Environment

- `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN` for ticket enrichment
- `GITHUB_TOKEN` for GitHub org membership lookup
- `ANTHROPIC_API_KEY` for module passport risk summaries
