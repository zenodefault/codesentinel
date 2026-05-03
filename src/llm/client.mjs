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

function getOpenAIModel(explicitModel) {
  return explicitModel ?? process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
}

function getGoogleModel(explicitModel) {
  return explicitModel ?? process.env.GOOGLE_MODEL ?? "gemini-2.5-flash";
}

function getQwenModel(explicitModel) {
  return explicitModel ?? process.env.QWEN_MODEL ?? "qwen-plus";
}

function getOpenRouterModel(explicitModel) {
  return explicitModel ?? process.env.OPENROUTER_MODEL ?? "openai/gpt-4.1-mini";
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

async function parseJsonResponse(response) {
  const body = await response.text();
  let payload = null;

  try {
    payload = body ? JSON.parse(body) : null;
  } catch {
    payload = body;
  }

  if (!response.ok) {
    const detail = typeof payload === "string" ? payload : JSON.stringify(payload);
    throw new Error(`HTTP ${response.status} ${response.statusText}: ${detail}`);
  }

  return payload;
}

async function generateWithOpenAICompatible({
  apiKey,
  baseUrl,
  model,
  prompt,
  systemPrompt,
  temperature,
  maxTokens,
  extraHeaders = {},
}) {
  if (!apiKey) {
    throw new Error("API key is not configured.");
  }

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      temperature,
      max_tokens: maxTokens,
      messages: [
        ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
        { role: "user", content: prompt },
      ],
    }),
  });

  const payload = await parseJsonResponse(response);
  const text = payload?.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("Provider response did not contain text.");
  }

  return text;
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

async function generateWithOpenAI({ systemPrompt, prompt, model, maxTokens, temperature }) {
  return generateWithOpenAICompatible({
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
    model: getOpenAIModel(model),
    prompt,
    systemPrompt,
    temperature,
    maxTokens,
  });
}

async function generateWithGoogle({ systemPrompt, prompt, model, maxTokens, temperature }) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not configured.");
  }

  const resolvedModel = getGoogleModel(model);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(resolvedModel)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: buildPrompt({ systemPrompt, prompt }),
              },
            ],
          },
        ],
      }),
    },
  );

  const payload = await parseJsonResponse(response);
  const text = payload?.candidates?.[0]?.content?.parts
    ?.map((part) => (typeof part?.text === "string" ? part.text : ""))
    .join("")
    .trim();

  if (!text) {
    throw new Error("Google response did not contain text.");
  }

  return text;
}

async function generateWithQwen({ systemPrompt, prompt, model, maxTokens, temperature }) {
  return generateWithOpenAICompatible({
    apiKey: process.env.QWEN_API_KEY,
    baseUrl: process.env.QWEN_BASE_URL ?? "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    model: getQwenModel(model),
    prompt,
    systemPrompt,
    temperature,
    maxTokens,
  });
}

async function generateWithOpenRouter({ systemPrompt, prompt, model, maxTokens, temperature }) {
  return generateWithOpenAICompatible({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseUrl: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
    model: getOpenRouterModel(model),
    prompt,
    systemPrompt,
    temperature,
    maxTokens,
    extraHeaders: {
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "https://codesentinel.local",
      "X-Title": process.env.OPENROUTER_APP_NAME ?? "CodeSentinel",
    },
  });
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

  if (provider === "openai") {
    return generateWithOpenAI({ systemPrompt, prompt, model, maxTokens, temperature });
  }

  if (provider === "google") {
    return generateWithGoogle({ systemPrompt, prompt, model, maxTokens, temperature });
  }

  if (provider === "qwen") {
    return generateWithQwen({ systemPrompt, prompt, model, maxTokens, temperature });
  }

  if (provider === "openrouter") {
    return generateWithOpenRouter({ systemPrompt, prompt, model, maxTokens, temperature });
  }

  if (provider === "openclaw-cli") {
    return generateWithOpenClaw({ systemPrompt, prompt, model });
  }

  throw new Error(`Unsupported LLM provider: ${provider}`);
}

export function getLlmProviderLabel() {
  return resolveProvider();
}
