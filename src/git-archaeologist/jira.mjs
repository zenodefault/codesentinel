import axios from "axios";

function jiraAuthHeaders() {
  const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN } = process.env;

  if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_API_TOKEN) {
    return null;
  }

  return {
    baseUrl: JIRA_BASE_URL.replace(/\/$/, ""),
    headers: {
      Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`,
      Accept: "application/json",
    },
  };
}

export async function fetchJiraIssues(issueKeys) {
  const auth = jiraAuthHeaders();

  if (!auth) {
    return {
      issues: [],
      warnings: ["Jira credentials are not configured; ticket enrichment was skipped."],
    };
  }

  const warnings = [];
  const issues = [];

  for (const issueKey of issueKeys) {
    try {
      const response = await axios.get(`${auth.baseUrl}/rest/api/3/issue/${issueKey}`, {
        headers: auth.headers,
      });

      issues.push({
        key: issueKey,
        summary: response.data.fields?.summary ?? "",
        description: response.data.fields?.description ?? null,
        resolution: response.data.fields?.resolution?.name ?? null,
      });
    } catch (error) {
      warnings.push(`Unable to fetch Jira issue ${issueKey}: ${error.message}`);
    }
  }

  return { issues, warnings };
}
