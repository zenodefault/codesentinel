# auto-fix

Generates and validates a dependency security patch, then opens a draft PR.

## Trigger
- Critical CVE event produced by `cve-sweep`.

## Inputs
- Local repo path
- Ecosystem (`npm` or `pip`)
- Vulnerable dependency name
- CVE ID
- GitHub repo full name and base branch

## Processing
1. Determine candidate safe version from npm/PyPI metadata.
2. Patch manifest (`package.json` or `requirements.txt`).
3. For npm, refresh `package-lock.json`.
4. Run Docker simulation (`npm ci && npm test --if-present` or `pip install && pytest`).
5. Compare old/new dependency license metadata.
6. Create draft fix PR with evidence and warning fields.
7. Send Slack alert; optionally send Twilio WhatsApp approval prompt.

## Outputs
- Draft PR title format: `[CodeSentinel] Fix CVE-XXXX-YYYY in {dep-name}`
- Structured JSON result for orchestration

## CLI
`node ./src/auto-fix/run-auto-fix.mjs --repo ./target --repo-full-name owner/repo --ecosystem npm --dependency lodash --cve CVE-2021-23337`
