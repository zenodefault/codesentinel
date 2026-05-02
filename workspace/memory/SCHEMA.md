# Durable Memory Schema

This schema is locked for cross-team integration.

## Root Layout

- `memory/upgrade_decisions.md`
- `memory/ghost_authors.md`
- `memory/repos/{repo_name}/dependency_ledger.md`
- `memory/repos/{repo_name}/blast_radius_map.md`
- `memory/repos/{repo_name}/decision_history.md`
- `memory/repos/{repo_name}/module_passports/{module_name}.md`

## File Format Contract

Every Durable Memory file is markdown with:

1. A level-1 title.
2. A short descriptive paragraph.
3. One fenced `json` block that contains the machine-readable payload.

Skills must treat the JSON block as the source of truth. Human-readable prose can be added before or after it, but downstream automation should only parse the fenced JSON.

## Shared Files

### `upgrade_decisions.md`

```json
{
  "decisions": []
}
```

### `ghost_authors.md`

```json
{
  "ghostAuthors": []
}
```

## Per-Repo Files

### `dependency_ledger.md`

```json
{
  "repo": "repo-slug",
  "updatedAt": null,
  "dependencies": []
}
```

### `blast_radius_map.md`

```json
{
  "repo": "repo-slug",
  "updatedAt": null,
  "files": {}
}
```

### `decision_history.md`

```json
{
  "repo": "repo-slug",
  "updatedAt": null,
  "decisions": []
}
```

### `module_passports/{module_name}.md`

```json
{
  "module": "src/example.ts",
  "generatedAt": null,
  "summary": ""
}
```

## Integration Notes

- Repo names are normalized to lowercase slugs by `src/memory/memory.mjs`.
- Shared helpers own file creation and updates; other skills should import the helper rather than writing these files directly.
- If a new memory artifact is needed later, add it here first before another team consumes it.
