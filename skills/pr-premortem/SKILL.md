# pr-premortem

Analyzes pull request changes and publishes a risk-focused pre-mortem comment.

## Inputs
- Repository memory key (`repoName`)
- GitHub repository full name (`owner/repo`)
- Pull request number
- Changed file list (or fetched from GitHub PR files API)

## Processing
1. Load `blast_radius_map.md` for changed-file blast radius.
2. Load `ghost_authors.md` for departed-owner exposure.
3. Load `dependency_ledger.md` to map dependency CVEs linked to changed files.
4. Produce per-file risk levels and aggregate failure modes.
5. Post or update one idempotent PR comment.

## Outputs
- GitHub comment marker: `<!-- codesentinel:pr-premortem -->`
- Markdown card with summary table, ghost ownership section, CVE section, and what-could-go-wrong narrative.

## CLI
`node ./src/pr-premortem/run-pr-premortem.mjs --repo codesentinel --repo-full-name owner/repo --pr 123 --fetch-from-github`
