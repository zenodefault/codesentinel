export function renderDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeSentinel Live Canvas</title>
    <style>
      :root {
        --bg: #f4efe6;
        --panel: rgba(255, 250, 242, 0.92);
        --ink: #1e2430;
        --muted: #5d6472;
        --line: rgba(30, 36, 48, 0.12);
        --low: #2f7d4a;
        --medium: #c79717;
        --high: #c9641e;
        --critical: #be2f2f;
        --accent: #0f6c78;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        color: var(--ink);
        background:
          radial-gradient(circle at top left, rgba(15, 108, 120, 0.18), transparent 28%),
          radial-gradient(circle at top right, rgba(201, 100, 30, 0.18), transparent 24%),
          linear-gradient(180deg, #fbf6ee 0%, #f1eadf 100%);
      }

      header {
        padding: 2.5rem 1.25rem 1.5rem;
        text-align: center;
      }

      header h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 4rem);
        letter-spacing: 0.04em;
      }

      header p {
        max-width: 52rem;
        margin: 0.75rem auto 0;
        color: var(--muted);
        font-size: 1rem;
      }

      main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
        padding: 0 1rem 2rem;
      }

      section {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 1rem;
        box-shadow: 0 20px 50px rgba(30, 36, 48, 0.08);
      }

      h2 {
        margin-top: 0;
        font-size: 1.15rem;
      }

      .meta {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        color: var(--muted);
        font-size: 0.92rem;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        border-radius: 999px;
        padding: 0.2rem 0.6rem;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.7);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0.75rem;
        font-size: 0.93rem;
      }

      th, td {
        text-align: left;
        padding: 0.7rem 0.5rem;
        border-bottom: 1px solid var(--line);
        vertical-align: top;
      }

      th button {
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        padding: 0;
        cursor: pointer;
      }

      .risk {
        font-weight: 700;
      }

      .risk.low { color: var(--low); }
      .risk.medium { color: var(--medium); }
      .risk.high { color: var(--high); }
      .risk.critical { color: var(--critical); }

      .flash {
        animation: flash 1.2s ease;
      }

      @keyframes flash {
        0% { background: rgba(15, 108, 120, 0.22); }
        100% { background: transparent; }
      }

      .empty {
        color: var(--muted);
        font-style: italic;
      }

      @media (max-width: 720px) {
        header { padding-top: 1.5rem; }
        main { padding-bottom: 1rem; }
        table { font-size: 0.88rem; }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>CodeSentinel</h1>
      <p>Live Canvas for dependency drift, blast radius, and approval-gated remediation. Refreshes every 60 seconds from Durable Memory.</p>
      <div class="meta">
        <span class="pill" id="updatedAt">Waiting for memory...</span>
        <span class="pill" id="repoCount">Repos: 0</span>
        <span class="pill" id="criticalCount">Critical: 0</span>
      </div>
    </header>
    <main>
      <section>
        <h2>Dependency Health Matrix</h2>
        <table>
          <thead>
            <tr>
              <th><button data-sort="dependencyMatrix" data-field="repo">Repo</button></th>
              <th><button data-sort="dependencyMatrix" data-field="name">Dependency</button></th>
              <th><button data-sort="dependencyMatrix" data-field="actualRisk">ActualRisk</button></th>
              <th>Risk</th>
              <th>CVEs</th>
            </tr>
          </thead>
          <tbody id="dependencyBody"></tbody>
        </table>
      </section>
      <section>
        <h2>Blast Radius Panel</h2>
        <table>
          <thead>
            <tr>
              <th><button data-sort="blastRadiusRows" data-field="repo">Repo</button></th>
              <th><button data-sort="blastRadiusRows" data-field="filePath">File</button></th>
              <th><button data-sort="blastRadiusRows" data-field="blastRadiusScore">Downstream</button></th>
              <th>Ghosts</th>
            </tr>
          </thead>
          <tbody id="blastBody"></tbody>
        </table>
      </section>
      <section>
        <h2>Open Actions</h2>
        <div id="actionsBody" class="empty">No open actions.</div>
      </section>
    </main>
    <script>
      const sortState = {
        dependencyMatrix: { field: "actualRisk", direction: "desc" },
        blastRadiusRows: { field: "blastRadiusScore", direction: "desc" },
      };
      let previousFingerprint = "";

      function compare(a, b) {
        if (typeof a === "number" && typeof b === "number") {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      }

      function riskClass(level) {
        return (level || "LOW").toLowerCase();
      }

      function fingerprint(payload) {
        return JSON.stringify({
          dependencyMatrix: payload.dependencyMatrix.slice(0, 8),
          blastRadiusRows: payload.blastRadiusRows.slice(0, 8),
          openActions: payload.openActions,
        });
      }

      function renderTableRows(rows, state) {
        const items = [...rows].sort((left, right) => {
          const value = compare(left[state.field], right[state.field]);
          return state.direction === "asc" ? value : -value;
        });
        return items;
      }

      function render(payload) {
        const currentFingerprint = fingerprint(payload);
        const flash = previousFingerprint && previousFingerprint !== currentFingerprint;
        previousFingerprint = currentFingerprint;

        document.getElementById("updatedAt").textContent = "Updated: " + new Date(payload.generatedAt).toLocaleString();
        document.getElementById("repoCount").textContent = "Repos: " + payload.repos.length;
        document.getElementById("criticalCount").textContent = "Critical: " + payload.counts.CRITICAL;

        const dependencyBody = document.getElementById("dependencyBody");
        const blastBody = document.getElementById("blastBody");
        const actionsBody = document.getElementById("actionsBody");

        dependencyBody.innerHTML = renderTableRows(payload.dependencyMatrix, sortState.dependencyMatrix).slice(0, 20).map((item) => \`
          <tr class="\${flash ? "flash" : ""}">
            <td>\${item.repo}</td>
            <td>\${item.name}</td>
            <td>\${item.actualRisk}</td>
            <td class="risk \${riskClass(item.riskLevel)}">\${item.riskLevel}</td>
            <td>\${item.cveIds.join(", ") || "none"}</td>
          </tr>
        \`).join("") || '<tr><td colspan="5" class="empty">No dependency data in memory yet.</td></tr>';

        blastBody.innerHTML = renderTableRows(payload.blastRadiusRows, sortState.blastRadiusRows).slice(0, 20).map((item) => \`
          <tr class="\${flash ? "flash" : ""}">
            <td>\${item.repo}</td>
            <td>\${item.filePath}</td>
            <td>\${item.blastRadiusScore}</td>
            <td>\${item.ghostAuthors}</td>
          </tr>
        \`).join("") || '<tr><td colspan="4" class="empty">No module passports found yet.</td></tr>';

        if (!payload.openActions.length) {
          actionsBody.className = "empty";
          actionsBody.textContent = "No auto-fix PRs waiting for approval.";
        } else {
          actionsBody.className = "";
          actionsBody.innerHTML = payload.openActions.map((action) => \`
            <p class="\${flash ? "flash" : ""}">
              <strong>\${action.repo}</strong> / \${action.dependency} [\${action.status}]
              \${action.prUrl ? '<a href="' + action.prUrl + '" target="_blank" rel="noreferrer">Open PR</a>' : ""}
              <br />
              <span>\${action.reason || "Awaiting human decision."}</span>
            </p>
          \`).join("");
        }
      }

      async function load() {
        const response = await fetch("/api/dashboard");
        const payload = await response.json();
        render(payload);
      }

      for (const button of document.querySelectorAll("[data-sort]")) {
        button.addEventListener("click", () => {
          const group = button.dataset.sort;
          const field = button.dataset.field;
          const current = sortState[group];
          sortState[group] = {
            field,
            direction: current.field === field && current.direction === "desc" ? "asc" : "desc",
          };
          load();
        });
      }

      load();
      setInterval(load, 60000);
    </script>
  </body>
</html>`;
}
