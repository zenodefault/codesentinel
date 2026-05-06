import Anthropic from "@anthropic-ai/sdk";

export async function promptLlm(prompt, options = {}) {
  const provider = (process.env.CODESENTINEL_LLM_PROVIDER ?? "anthropic").toLowerCase();

  if (provider === "anthropic") {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is missing.");

    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
      max_tokens: options.max_tokens ?? 1000,
      temperature: options.temperature ?? 0.2,
      messages: [{ role: "user", content: prompt }],
    });

    return response.content.find((entry) => entry.type === "text")?.text?.trim() || "";
  }

  if (provider === "openai" || provider === "openrouter" || provider === "qwen") {
    const apiKey = 
      provider === "openrouter" ? process.env.OPENROUTER_API_KEY :
      provider === "qwen" ? process.env.QWEN_API_KEY :
      process.env.OPENAI_API_KEY;

    if (!apiKey) throw new Error(`${provider.toUpperCase()}_API_KEY is missing.`);

    const { default: OpenAI } = await import("openai");
    
    let baseURL = undefined;
    let model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

    if (provider === "openrouter") {
      baseURL = "https://openrouter.ai/api/v1";
      // Use a broadly available OpenRouter default model to avoid endpoint 404s.
      model = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";
    } else if (provider === "qwen") {
      baseURL = process.env.QWEN_BASE_URL ?? "https://dashscope.aliyuncs.com/compatible-mode/v1";
      model = process.env.QWEN_MODEL ?? "qwen-max";
    }

    const client = new OpenAI({ apiKey, baseURL });
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: options.max_tokens ?? 1000,
      temperature: options.temperature ?? 0.2,
    });

    return response.choices[0]?.message?.content?.trim() || "";
  }

  if (provider === "google") {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_API_KEY is missing.");

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: process.env.GOOGLE_MODEL ?? "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  throw new Error(`Unsupported or unconfigured LLM provider: ${provider}`);
}
