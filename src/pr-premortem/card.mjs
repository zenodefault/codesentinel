export const PREMORTEM_MARKER = "<!-- codesentinel:pr-premortem -->";

function escapePipe(text) {
  return String(text ?? "").replaceAll("|", "\\|");
}

export function buildPremortemMarkdown({ repo, prNumber, files, ghostOwned, cves, summary }) {
  const tableHeader = "| File | Blast Radius | Risk | CVEs |\n|---|---:|---|---|";
  const tableRows = files
    .map(
      (entry) =>
        `| ${escapePipe(entry.file)} | ${entry.blastRadiusCount} | ${entry.riskLevel} | ${escapePipe(
          entry.cveIds.join(", ") || "none",
        )} |`,
    )
    .join("\n");

  const ghostSection =
    ghostOwned.length === 0
      ? "No changed files are currently ghost-owned."
      : ghostOwned.map((entry) => `- ${entry.file}: original owner ${entry.authorEmail} has left`).join("\n");

  const cveSection =
    cves.length === 0
      ? "No dependency CVEs linked to modified files."
      : cves.map((entry) => `- ${entry.file}: ${entry.dependency} (${entry.cveId})`).join("\n");

  return `${PREMORTEM_MARKER}
# CodeSentinel Pre-mortem Card

Repository: **${repo}**  
PR: **#${prNumber}**

## Risk Summary
${tableHeader}
${tableRows || "| _none_ | 0 | LOW | none |"}

## Ghost-owned Files
${ghostSection}

## CVEs In Scope
${cveSection}

## What Could Go Wrong
${summary}
`;
}
