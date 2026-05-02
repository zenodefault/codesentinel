import crypto from "node:crypto";

function timingSafeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

export function verifySlackSignature({ body, signature, timestamp, signingSecret, toleranceSeconds = 60 * 5 }) {
  if (!signingSecret || !signature || !timestamp) {
    return {
      ok: false,
      reason: "missing-signature-parts",
    };
  }

  const unixTimestamp = Number(timestamp);

  if (!Number.isFinite(unixTimestamp)) {
    return {
      ok: false,
      reason: "invalid-timestamp",
    };
  }

  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - unixTimestamp);

  if (ageSeconds > toleranceSeconds) {
    return {
      ok: false,
      reason: "timestamp-outside-tolerance",
    };
  }

  const base = `v0:${timestamp}:${body}`;
  const digest = crypto.createHmac("sha256", signingSecret).update(base).digest("hex");
  const expected = `v0=${digest}`;

  return {
    ok: timingSafeEqual(expected, signature),
    reason: timingSafeEqual(expected, signature) ? null : "signature-mismatch",
  };
}
