const GITHUB_API = "https://api.github.com";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
}

function buildHeaders(extra = {}) {
  const token = requireEnv("GITHUB_TOKEN");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "codesentinel",
    ...extra,
  };
}

async function githubRequest(path, { method = "GET", body, headers } = {}) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    method,
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API ${method} ${path} failed: ${response.status} ${errorText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function parseRepoFullName(fullName) {
  const [owner, repo] = (fullName ?? "").split("/");
  if (!owner || !repo) {
    throw new Error(`Invalid repository full name: ${fullName}`);
  }
  return { owner, repo };
}

export async function listPullRequestFiles(owner, repo, pullNumber) {
  let page = 1;
  const files = [];

  while (true) {
    const chunk = await githubRequest(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/files?per_page=100&page=${page}`,
    );

    files.push(...chunk);
    if (chunk.length < 100) {
      break;
    }
    page += 1;
  }

  return files;
}

export async function findExistingPremortemComment(owner, repo, issueNumber, marker) {
  let page = 1;

  while (true) {
    const comments = await githubRequest(
      `/repos/${owner}/${repo}/issues/${issueNumber}/comments?per_page=100&page=${page}`,
    );

    const existing = comments.find((comment) => comment.body?.includes(marker));
    if (existing) {
      return existing;
    }

    if (comments.length < 100) {
      return null;
    }

    page += 1;
  }
}

export async function createIssueComment(owner, repo, issueNumber, body) {
  return githubRequest(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
    method: "POST",
    body: { body },
  });
}

export async function updateIssueComment(owner, repo, commentId, body) {
  return githubRequest(`/repos/${owner}/${repo}/issues/comments/${commentId}`, {
    method: "PATCH",
    body: { body },
  });
}

export async function getRef(owner, repo, branch) {
  return githubRequest(`/repos/${owner}/${repo}/git/ref/heads/${branch}`);
}

export async function createRef(owner, repo, branch, sha) {
  return githubRequest(`/repos/${owner}/${repo}/git/refs`, {
    method: "POST",
    body: {
      ref: `refs/heads/${branch}`,
      sha,
    },
  });
}

export async function upsertFile(owner, repo, path, message, contentBase64, branch, sha = null) {
  return githubRequest(`/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    body: {
      message,
      content: contentBase64,
      branch,
      sha: sha ?? undefined,
    },
  });
}

export async function getFile(owner, repo, path, ref = null) {
  try {
    const suffix = ref ? `?ref=${encodeURIComponent(ref)}` : "";
    return await githubRequest(`/repos/${owner}/${repo}/contents/${path}${suffix}`);
  } catch (error) {
    if (String(error.message).includes("404")) {
      return null;
    }
    throw error;
  }
}

export async function createPullRequest(owner, repo, payload) {
  return githubRequest(`/repos/${owner}/${repo}/pulls`, {
    method: "POST",
    body: payload,
  });
}

export async function updatePullRequest(owner, repo, pullNumber, payload) {
  return githubRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}`, {
    method: "PATCH",
    body: payload,
  });
}
