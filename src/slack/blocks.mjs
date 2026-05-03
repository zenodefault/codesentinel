function truncate(text, max = 180) {
  if (!text) {
    return "No summary available.";
  }

  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

export function buildFooterBlock() {
  const dashboardUrl = process.env.CODESENTINEL_DASHBOARD_URL ?? process.env.CODESENTINEL_BASE_URL ?? "http://localhost:3000";

  return {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `Live Canvas: ${dashboardUrl}`,
      },
    ],
  };
}

export function buildRegisterProgressBlocks(repoInput) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "CodeSentinel registration started",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Preparing Durable Memory and scanning *${repoInput}*. Initial CVE sweep and archaeology pass are queued.`,
      },
    },
    buildFooterBlock(),
  ];
}

export function buildRegisterSummaryBlocks(summary) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Repository registered: ${summary.repoName}`,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Dependencies*\n${summary.totalDependencies}`,
        },
        {
          type: "mrkdwn",
          text: `*Critical CVEs*\n${summary.criticalIssues}`,
        },
        {
          type: "mrkdwn",
          text: `*Ghost authors*\n${summary.ghostAuthorCount}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Tracked files: *${summary.modulePassportCount}* passport(s). Memory is now ready for \`/scan ${summary.repoName}\` and \`/why <file>\`.`,
      },
    },
    buildFooterBlock(),
  ];
}

export function buildScanBlocks(summary) {
  const rows = summary.dependencies.slice(0, 8).map((dependency) => {
    const advisories = dependency.advisories?.map((entry) => entry.cveId ?? entry.id).filter(Boolean).join(", ") || "none";
    return `*${dependency.name}* | ${dependency.riskLevel} | score ${dependency.actualRisk} | ${advisories}`;
  });

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Dependency Health Matrix: ${summary.repoName}`,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Scanned deps*\n${summary.dependencies.length}`,
        },
        {
          type: "mrkdwn",
          text: `*Critical*\n${summary.counts.CRITICAL}`,
        },
        {
          type: "mrkdwn",
          text: `*High*\n${summary.counts.HIGH}`,
        },
        {
          type: "mrkdwn",
          text: `*Medium*\n${summary.counts.MEDIUM}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: rows.length ? rows.join("\n") : "No tracked dependencies were found in memory.",
      },
    },
    buildFooterBlock(),
  ];
}

export function buildWhyBlocks(passport) {
  const warnings = passport.warnings?.length ? passport.warnings.map((warning) => `- ${warning}`).join("\n") : "None";
  const ghostAuthors =
    passport.ghostAuthors?.length
      ? passport.ghostAuthors.map((author) => `${author.email} (${author.commitCount} commit(s))`).join("\n")
      : "No ghost authors detected.";
  const ownershipContacts =
    passport.ownership?.suggestedContacts?.length
      ? passport.ownership.suggestedContacts
          .slice(0, 5)
          .map((contact) => `- ${contact.label} [${contact.source}, ${contact.confidence}]`)
          .join("\n")
      : "No likely contacts found yet.";
  const decisions =
    passport.keyDecisions?.length
      ? passport.keyDecisions
          .slice(0, 5)
          .map((decision) => `- ${decision.ticketId ?? decision.commitHash ?? "decision"}: ${truncate(decision.summary ?? decision.subject, 120)}`)
          .join("\n")
      : "No Jira-linked decisions found.";

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Why this file matters: ${passport.module}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Module role*\n${passport.whatItDoes ?? passport.summary ?? "No module description available."}`,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Blast radius*\n${passport.blastRadiusScore ?? passport.blastRadius?.blastRadiusCount ?? 0}`,
        },
        {
          type: "mrkdwn",
          text: `*Ghost ownership risk*\n${passport.ghostAuthors?.length ? "Review needed" : "Low"}`,
        },
        {
          type: "mrkdwn",
          text: `*Primary owner*\n${passport.ownership?.primaryOwner?.label ?? "Unmapped"}`,
        },
        {
          type: "mrkdwn",
          text: `*Likely team*\n${passport.ownership?.likelyTeam?.name ?? "Unassigned"}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Risk summary*\n${passport.riskSummary ?? "No plain-English summary available."}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Ghost authors*\n${ghostAuthors}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Who to contact*\n${ownershipContacts}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Decision context*\n${decisions}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Warnings*\n${warnings}`,
      },
    },
    buildFooterBlock(),
  ];
}

export function buildRotReportBlocks(report) {
  const risky = report.topDependencies
    .map((entry, index) => `${index + 1}. *${entry.name}* (${entry.repo}) score ${entry.actualRisk} [${entry.riskLevel}]`)
    .join("\n");
  const overdue = report.overdueDeferrals
    .map((entry) => `- *${entry.repo}* / *${entry.dependency}*: ${truncate(entry.reason, 90)}`)
    .join("\n");

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Weekly Code Rot Report",
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Repos scanned*\n${report.repoCount}`,
        },
        {
          type: "mrkdwn",
          text: `*Critical issues*\n${report.counts.CRITICAL}`,
        },
        {
          type: "mrkdwn",
          text: `*Overdue deferrals*\n${report.overdueDeferrals.length}`,
        },
        {
          type: "mrkdwn",
          text: `*Health score*\n${report.overallHealthScore}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Top 5 dangerous dependencies*\n${risky || "No risky dependencies found."}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Overdue deferrals*\n${overdue || "No overdue deferrals."}`,
      },
    },
    buildFooterBlock(),
  ];
}

export function buildSimpleErrorBlocks(title, message) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: title,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: message,
      },
    },
    buildFooterBlock(),
  ];
}

export function buildCriticalDependencyBlocks(repoName, dependency) {
  const advisory = dependency.advisories.find((item) => item.cvssBaseScore) ?? dependency.advisories[0] ?? {};

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Critical dependency risk in ${repoName}`,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Dependency*\n${dependency.name}`,
        },
        {
          type: "mrkdwn",
          text: `*Risk level*\n${dependency.riskLevel}`,
        },
        {
          type: "mrkdwn",
          text: `*Advisory*\n${dependency.advisories.find((item) => item.cveId)?.cveId ?? advisory.id ?? "unknown-advisory"}`,
        },
        {
          type: "mrkdwn",
          text: `*CVSS*\n${dependency.cvssBaseScore ?? advisory.cvssBaseScore ?? "n/a"}`,
        },
        {
          type: "mrkdwn",
          text: `*Blast radius*\n${dependency.blastRadius.importCount} file(s)`,
        },
        {
          type: "mrkdwn",
          text: `*ActualRisk*\n${dependency.actualRisk}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Summary*\n${truncate(advisory.summary)}`,
      },
    },
    buildFooterBlock(),
  ];
}
