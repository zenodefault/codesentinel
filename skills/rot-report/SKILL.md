# rot-report

Generate a weekly cross-repo dependency rot digest from Durable Memory.

## Inputs

- Registered repos under `workspace/memory/repos/`
- Shared memory from `workspace/memory/upgrade_decisions.md`
- Shared memory from `workspace/memory/ghost_authors.md`

## Output

- Ranked top-risk dependency list
- Overdue deferral callouts
- Aggregate health score
- Slack-ready summary blocks
- Optional DOCX report via `npm run report:weekly -- --notify`

## Entry Points

- `npm run rot-report`
- `npm run rot-report -- --notify`
- `npm run report:weekly`

## Notes

- Reads the fenced JSON block from every memory artifact.
- Treats `upgrade_decisions.md` as the source of truth for open deferrals.
- Uses module passports when available to surface blast radius hotspots.
