import { readFile } from "node:fs/promises";
import YAML from "yaml";

const FRONTMATTER_PATTERN = /^---\n([\s\S]*?)\n---\n?/;

export async function loadHeartbeatConfig(heartbeatPath = new URL("../../workspace/HEARTBEAT.md", import.meta.url)) {
  const raw = await readFile(heartbeatPath, "utf8");
  const match = raw.match(FRONTMATTER_PATTERN);

  if (!match) {
    throw new Error(`HEARTBEAT.md is missing YAML frontmatter: ${heartbeatPath}`);
  }

  const parsed = YAML.parse(match[1]);

  if (!parsed || typeof parsed !== "object") {
    throw new Error("HEARTBEAT.md frontmatter did not parse into an object.");
  }

  return {
    ...parsed,
    body: raw.slice(match[0].length).trim(),
  };
}
