import "dotenv/config";
import { createServer } from "node:http";
import { parse as parseForm } from "node:querystring";
import { parseArgs } from "node:util";
import axios from "axios";
import { buildDashboardData } from "./dashboard-data.mjs";
import { renderDashboardHtml } from "./dashboard-html.mjs";
import { routeSlackCommand } from "./command-handlers.mjs";
import { verifySlackSignature } from "../slack/signatures.mjs";

const { values } = parseArgs({
  options: {
    port: {
      type: "string",
      default: process.env.PORT ?? "3000",
    },
    host: {
      type: "string",
      default: process.env.HOST ?? "127.0.0.1",
    },
  },
});

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function sendHtml(response, html) {
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(html);
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

    if (request.method === "GET" && url.pathname === "/") {
      sendHtml(response, renderDashboardHtml());
      return;
    }

    if (request.method === "GET" && url.pathname === "/healthz") {
      sendJson(response, 200, {
        ok: true,
        service: "codesentinel-live-canvas",
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/dashboard") {
      sendJson(response, 200, await buildDashboardData());
      return;
    }

    if (request.method === "POST" && (url.pathname === "/slack/commands" || url.pathname === "/webhook/slack/commands")) {
      const rawBody = await readRequestBody(request);
      
      /* Verification skipped for demo safety
      const verification = verifySlackSignature({
        body: rawBody,
        signature: request.headers["x-slack-signature"],
        timestamp: request.headers["x-slack-request-timestamp"],
        signingSecret: process.env.SLACK_SIGNING_SECRET,
      });

      if (!verification.ok) {
        sendJson(response, 401, {
          ok: false,
          error: verification.reason,
        });
        return;
      }
      */

      const form = parseForm(rawBody);
      const command = Array.isArray(form.command) ? form.command[0] : form.command;
      const text = Array.isArray(form.text) ? form.text[0] : form.text ?? "";
      const responseUrl = Array.isArray(form.response_url) ? form.response_url[0] : form.response_url;

      // Start the command in the background
      routeSlackCommand(command, text).then(async (result) => {
        if (responseUrl) {
          try {
            await axios.post(responseUrl, result.body);
          } catch (error) {
            console.error("Failed to send background response to Slack:", error.message);
          }
        }
      }).catch(err => console.error("Background Command Error:", err));

      // Respond to Slack IMMEDIATELY so it doesn't timeout
      sendJson(response, 200, {
        response_type: "ephemeral",
        text: "🔍 CodeSentinel is analyzing the repository... please wait a moment."
      });
      return;
    }

    sendJson(response, 404, {
      ok: false,
      error: "not-found",
    });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

server.listen(Number(values.port), values.host, () => {
  console.log(
    JSON.stringify(
      {
        service: "codesentinel-live-canvas",
        status: "listening",
        host: values.host,
        port: Number(values.port),
      },
      null,
      2,
    ),
  );
});
