import "dotenv/config";
import crypto from "node:crypto";
import http from "node:http";
import { listPullRequestFiles, parseRepoFullName, updatePullRequest } from "../integrations/github.mjs";
import { generatePremortem, postPremortemComment } from "../pr-premortem/run-pr-premortem.mjs";
import { sendBlastRadiusWarning } from "../integrations/slack-notify.mjs";
import { readRepoMemory } from "../memory/memory.mjs";

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function verifyGithubSignature(rawBody, signatureHeader) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("GITHUB_WEBHOOK_SECRET is required for webhook verification.");
  }
  const digest = `sha256=${crypto.createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  const left = Buffer.from(digest);
  const right = Buffer.from(signatureHeader ?? "");
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function textResponse(res, statusCode, body) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

async function handlePullRequestEvent(payload) {
  if (payload.action !== "opened" && payload.action !== "synchronize" && payload.action !== "reopened") {
    return { skipped: true, reason: `Unsupported action ${payload.action}` };
  }

  const fullRepoName = payload.repository.full_name;
  const repoName = payload.repository.name;
  const pullNumber = payload.pull_request.number;
  const baseBranch = payload.pull_request.base?.ref ?? "unknown";
  const author = payload.pull_request.user?.login ?? "unknown";
  const authorEmail = payload.pull_request.user?.email ?? ""; 
  const { owner, repo } = parseRepoFullName(fullRepoName);
  const files = await listPullRequestFiles(owner, repo, pullNumber);
  const changedFiles = files.map((entry) => entry.filename);

  const premortem = await generatePremortem({
    repoName,
    fullRepoName,
    pullNumber,
    changedFiles,
  });

  const posted = await postPremortemComment({
    fullRepoName,
    pullNumber,
    markdown: premortem.markdown,
  });

  // Onboarding Buddy
  const onboardingContexts = await identifyNewOnboardingContext({
    repoName,
    authorEmail,
    authorLogin: author,
    changedFiles,
  });

  let onboardingPosted = null;
  if (onboardingContexts.length > 0) {
    const message = buildOnboardingMessage(onboardingContexts);
    const markedMessage = `${ONBOARDING_MARKER}\n${message}`;
    
    const existing = await findExistingPremortemComment(owner, repo, pullNumber, ONBOARDING_MARKER);
    if (!existing) {
      onboardingPosted = await createIssueComment(owner, repo, pullNumber, markedMessage);
    }
  }

  return {
    skipped: false,
    repo: fullRepoName,
    pullNumber,
    baseBranch,
    author,
    changedFiles,
    comment: posted,
    onboarding: onboardingPosted ? "posted" : "skipped_or_already_exists",
  };
}

async function handleFileEditedEvent(payload) {
  const repoName = payload.repoName;
  const filePath = payload.filePath;
  if (!repoName || !filePath) {
    return { skipped: true, reason: "repoName and filePath are required" };
  }

  const memory = await readRepoMemory(repoName);
  const impacted = memory.blastRadiusMap.files?.[filePath] ?? [];
  await sendBlastRadiusWarning({ repoName, filePath, impactedCount: impacted.length });

  return { skipped: false, repoName, filePath, impactedCount: impacted.length };
}

async function handleTwilioApproval(payload) {
  const body = String(payload.Body ?? "").trim().toUpperCase();
  const pr = Number(payload.pr_number ?? payload.PrNumber ?? payload.prNumber);
  const repoFullName = payload.repo_full_name ?? payload.repoFullName;

  if (!repoFullName || !pr) {
    return { skipped: true, reason: "repo_full_name and pr_number are required" };
  }

  if (body !== "YES") {
    return { skipped: true, reason: `No approval action for reply: ${body}` };
  }

  const { owner, repo } = parseRepoFullName(repoFullName);
  await updatePullRequest(owner, repo, pr, { draft: false });

  return { skipped: false, repoFullName, pullNumber: pr, action: "marked_ready_for_review" };
}

export function startWebhookServer(port = Number(process.env.PORT ?? 8787)) {
  const server = http.createServer(async (req, res) => {
    try {
      if (req.method === "GET" && req.url === "/health") {
        textResponse(res, 200, { ok: true });
        return;
      }

      if (req.method === "POST" && req.url === "/webhook/github") {
        const rawBody = await readBody(req);
        const signature = req.headers["x-hub-signature-256"];
        if (!verifyGithubSignature(rawBody, signature)) {
          textResponse(res, 401, { error: "Invalid signature" });
          return;
        }

        const event = req.headers["x-github-event"];
        const payload = JSON.parse(rawBody.toString("utf8"));

        if (event === "pull_request") {
          textResponse(res, 200, await handlePullRequestEvent(payload));
          return;
        }

        if (event === "file_edited") {
          textResponse(res, 200, await handleFileEditedEvent(payload));
          return;
        }

        textResponse(res, 200, { skipped: true, reason: `Unhandled GitHub event: ${event}` });
        return;
      }

      if (req.method === "POST" && req.url === "/webhook/twilio/whatsapp") {
        const rawBody = await readBody(req);
        const payload = Object.fromEntries(new URLSearchParams(rawBody.toString("utf8")));
        textResponse(res, 200, await handleTwilioApproval(payload));
        return;
      }

      textResponse(res, 404, { error: "Not found" });
    } catch (error) {
      textResponse(res, 500, { error: error.message });
    }
  });

  server.listen(port, () => {
    const addr = server.address();
    const actualPort = typeof addr === "string" ? addr : addr?.port;
    console.log(JSON.stringify({ status: "listening", port: actualPort }, null, 2));
  });
  return server;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startWebhookServer();
}
