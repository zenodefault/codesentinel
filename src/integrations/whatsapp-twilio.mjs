function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
}

function authHeader() {
  const sid = required("TWILIO_ACCOUNT_SID");
  const token = required("TWILIO_AUTH_TOKEN");
  return `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`;
}

export async function sendWhatsAppApprovalRequest({ to, cveId, dependency, prNumber, buildPassed, licenseWarning }) {
  const from = required("TWILIO_WHATSAPP_FROM");
  const sid = required("TWILIO_ACCOUNT_SID");
  const body = `🔴 ${cveId} found in ${dependency}. Auto-fix PR #${prNumber} is ready. Build ${
    buildPassed ? "passed" : "failed"
  }. ${licenseWarning ? "License changed - review required." : "License unchanged."} Reply YES to approve merge or NO to dismiss.`;

  const params = new URLSearchParams({
    From: from,
    To: to,
    Body: body,
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Twilio send failed: ${response.status} ${text}`);
  }

  return response.json();
}
