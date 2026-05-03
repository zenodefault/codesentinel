# CodeSentinel Demo Script

1. Run `/sentinel register {repo}` in Slack.
Expected: Slack confirms registration, Durable Memory is populated, and Live Canvas begins showing the repo.

2. Trigger the morning CVE sweep.
Expected: a Slack dependency alert appears for any dependency crossing the critical threshold.

3. Edit a tracked file.
Expected: blast radius analysis updates in memory, ownership clues are surfaced for the touched file, and the Live Canvas blast radius table refreshes on the next poll.

4. Open a PR.
Expected: the GitHub webhook flow posts a Pre-mortem Card comment.

5. Trigger a CRITICAL CVE path.
Expected: an auto-fix Draft PR opens and shows up under Open Actions.

6. Confirm the WhatsApp approval prompt.
Expected: the approver receives a YES/NO merge decision request.

7. Trigger the Monday rot-report.
Expected: Slack receives the weekly digest summary and the DOCX report attachment.
