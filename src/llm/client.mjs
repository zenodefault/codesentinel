import { execFile } from "node:child_process";
import { promisify } from "node:util";
import Anthropic from "@anthropic-ai/sdk";

const execFileAsync = promisify(execFile);

function resolveProvider() {
  return (process.env.CODESENTINEL_LLM_PROVIDER ?? "anthropic").trim().toLowerCase();
}

function getAnthropicModel(explicitModel) {
  return explicitModel ?? process.env.ANTHROPIC_MODEL ?? process.env.CLAUDE_MODEL ?? "claude-sonnet-4-20250514";
}

function buildOpenClawSelectorArgs() {
  if (process.env.OPENCLAW_AGENT_ID) {
    return ["--agent", process.env.OPENCLAW_AGENT_ID];
  }

  if (process.env.OPENCLAW_SESSION_ID) {
    return ["--session-id", process.env.OPENCLAW_SESSION_ID];
  }

  if (process.env.OPENCLAW_TO) {
    return ["--to", process.env.OPENCLAW_TO];
  }

  throw new Error(
    "OpenClaw provider requires one of OPENCLAW_AGENT_ID, OPENCLAW_SESSION_ID, or OPENCLAW_TO.",
  );
}

function extractTextFromOpenClawResponse(payload) {
  const candidates = [
    payload?.reply,
    payload?.text,
    payload?.message,
    payload?.result?.text,
    payload?.result?.message,
    payload?.data?.text,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  if (Array.isArray(payload?.messages)) {
    const text = payload.messages
      .flatMap((entry) => {
        if (typeof entry === "string") {
          return [entry];
        }

        if (typeof entry?.text === "string") {
          return [entry.text];
        }

        if (Array.isArray(entry?.content)) {
          return entry.content
            .filter((block) => typeof block?.text === "string")
            .map((block) => block.text);
        }

        return [];
      })
      .join("\n")
      .trim();

    if (text) {
      return text;
    }
  }

  throw new Error("OpenClaw response did not contain a readable text field.");
}

function buildPrompt({ systemPrompt, prompt }) {
  if (!systemPrompt) {
    return prompt;
  }

  return [`System instructions:`, systemPrompt.trim(), "", `User request:`, prompt.trim()].join("\n");
}

async function generateWithAnthropic({ systemPrompt, prompt, model, maxTokens, temperature }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model: getAnthropicModel(model),
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt || undefined,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content.find((entry) => entry.type === "text")?.text?.trim();
  if (!text) {
    throw new Error("Anthropic response did not contain text.");
  }

  return text;
}

async function generateWithOpenClaw({ systemPrompt, prompt, model }) {
  const args = [
    "agent",
    ...buildOpenClawSelectorArgs(),
    "--local",
    "--json",
    "--message",
    buildPrompt({ systemPrompt, prompt }),
  ];

  if (model) {
    args.push("--model", model);
  } else if (process.env.OPENCLAW_MODEL) {
    args.push("--model", process.env.OPENCLAW_MODEL);
  }

  const { stdout } = await execFileAsync("openclaw", args, {
    cwd: process.cwd(),
    maxBuffer: 1024 * 1024 * 4,
  });

  const payload = JSON.parse(stdout);
  return extractTextFromOpenClawResponse(payload);
}

export async function generateText({
  systemPrompt = "",
  prompt,
  model,
  maxTokens = 256,
  temperature = 0.2,
}) {
  const provider = resolveProvider();

  if (!prompt?.trim()) {
    throw new Error("generateText requires a non-empty prompt.");
  }

  if (provider === "anthropic") {
    return generateWithAnthropic({ systemPrompt, prompt, model, maxTokens, temperature });
  }

  if (provider === "openclaw-cli") {
    return generateWithOpenClaw({ systemPrompt, prompt, model });
  }

  throw new Error(`Unsupported LLM provider: ${provider}`);
}

export function getLlmProviderLabel() {
  return resolveProvider();
}
