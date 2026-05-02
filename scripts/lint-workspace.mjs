import { access } from "node:fs/promises";

const requiredFiles = [
  "package.json",
  "workspace/AGENTS.md",
  "workspace/SOUL.md",
  "workspace/HEARTBEAT.md",
];

const missing = [];

for (const file of requiredFiles) {
  try {
    await access(new URL(`../${file}`, import.meta.url));
  } catch {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error(`Missing required workspace files:\n- ${missing.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log("Workspace lint passed.");
}
