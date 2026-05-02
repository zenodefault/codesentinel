const JSON_BLOCK_PATTERN = /```json\n([\s\S]*?)\n```/;

export function parseJsonBlock(raw, filePath = "memory file") {
  const match = raw.match(JSON_BLOCK_PATTERN);

  if (!match) {
    throw new Error(`Expected a fenced JSON block in ${filePath}`);
  }

  return JSON.parse(match[1]);
}

