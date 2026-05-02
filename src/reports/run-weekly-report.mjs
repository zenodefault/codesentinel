import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { parseArgs } from "node:util";
import { buildRotReport } from "../rot-report/aggregate.mjs";
import { uploadSlackFile } from "../integrations/slack.mjs";

const execFileAsync = promisify(execFile);

const { values } = parseArgs({
  options: {
    notify: {
      type: "boolean",
      default: false,
    },
    output: {
      type: "string",
      default: path.resolve(process.cwd(), "reports"),
    },
  },
});

const report = await buildRotReport();
const tempDir = await mkdtemp(path.join(os.tmpdir(), "codesentinel-report-"));
const jsonPath = path.join(tempDir, "report.json");
const filename = `codesentinel-weekly-${new Date().toISOString().slice(0, 10)}.docx`;
const outputPath = path.join(path.resolve(values.output), filename);

await writeFile(jsonPath, JSON.stringify(report, null, 2), "utf8");
await execFileAsync("python3", ["./src/reports/docx_builder.py", jsonPath, outputPath], {
  cwd: process.cwd(),
});

let slack = {
  sent: false,
  warning: null,
};

if (values.notify) {
  slack = await uploadSlackFile({
    channel: process.env.SLACK_REPORT_CHANNEL ?? process.env.SLACK_CHANNEL_ID,
    filePath: outputPath,
    filename,
    title: "Weekly CodeSentinel Digest",
    initialComment: `Weekly CodeSentinel Digest - ${report.repoCount} repos scanned, ${report.counts.CRITICAL} critical issues, ${report.overdueDeferrals.length} deferrals overdue.`,
  });
}

console.log(
  JSON.stringify(
    {
      report,
      outputPath,
      slack,
    },
    null,
    2,
  ),
);
