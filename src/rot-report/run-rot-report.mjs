import { parseArgs } from "node:util";
import { buildRotReport } from "./aggregate.mjs";
import { buildRotReportBlocks } from "../slack/blocks.mjs";
import { sendSlackBlocks } from "../integrations/slack.mjs";

const { values } = parseArgs({
  options: {
    notify: {
      type: "boolean",
      default: false,
    },
  },
});

const report = await buildRotReport();
let delivery = {
  sent: false,
  warning: null,
};

if (values.notify) {
  delivery = await sendSlackBlocks(
    buildRotReportBlocks(report),
    `Weekly CodeSentinel digest: ${report.repoCount} repos scanned, ${report.counts.CRITICAL} critical issues, ${report.overdueDeferrals.length} overdue deferrals.`,
  );
}

console.log(
  JSON.stringify(
    {
      ...report,
      delivery,
    },
    null,
    2,
  ),
);
