# Dependency Ledger

Tracked dependency risk data for codesentinel.

```json
{
  "repo": "codesentinel",
  "updatedAt": "2026-05-02T18:22:56.181Z",
  "manifest": {
    "ecosystem": "npm",
    "path": "/home/zenodefault/code/codesentinel/package.json"
  },
  "scanScope": "all",
  "maxDependencies": 5,
  "directDependencyCount": 11,
  "graph": {
    "nodes": [
      {
        "name": "@agentclientprotocol/sdk",
        "version": "0.21.0",
        "direct": false
      },
      {
        "name": "@anthropic-ai/sdk",
        "version": "^0.54.0",
        "direct": true
      },
      {
        "name": "@aws-crypto/crc32",
        "version": "5.2.0",
        "direct": false
      },
      {
        "name": "@aws-crypto/sha256-browser",
        "version": "5.2.0",
        "direct": false
      },
      {
        "name": "@aws-crypto/sha256-js",
        "version": "5.2.0",
        "direct": false
      },
      {
        "name": "@aws-crypto/supports-web-crypto",
        "version": "5.2.0",
        "direct": false
      },
      {
        "name": "@aws-crypto/util",
        "version": "5.2.0",
        "direct": false
      },
      {
        "name": "@aws-sdk/client-bedrock-runtime",
        "version": "3.1041.0",
        "direct": false
      },
      {
        "name": "@aws-sdk/core",
        "version": "3.974.8",
        "direct": false
      },
      {
        "name": "@aws-sdk/credential-provider-env",
        "version": "3.972.34",
        "direct": false
      },
      {
        "name": "@aws-sdk/credential-provider-http",
        "version": "3.972.36",
        "direct": false
      },
      {
        "name": "@aws-sdk/credential-provider-ini",
        "version": "3.972.38",
        "direct": false
      },
      {
        "name": "@aws-sdk/credential-provider-login",
        "version": "3.972.38",
        "direct": false
      },
      {
        "name": "@aws-sdk/credential-provider-node",
        "version": "3.972.39",
        "direct": false
      },
      {
        "name": "@aws-sdk/credential-provider-process",
        "version": "3.972.34",
        "direct": false
      },
      {
        "name": "@aws-sdk/credential-provider-sso",
        "version": "3.972.38",
        "direct": false
      },
      {
        "name": "@aws-sdk/credential-provider-web-identity",
        "version": "3.972.38",
        "direct": false
      },
      {
        "name": "@aws-sdk/eventstream-handler-node",
        "version": "3.972.14",
        "direct": false
      },
      {
        "name": "@aws-sdk/middleware-eventstream",
        "version": "3.972.10",
        "direct": false
      },
      {
        "name": "@aws-sdk/middleware-host-header",
        "version": "3.972.10",
        "direct": false
      },
      {
        "name": "@aws-sdk/middleware-logger",
        "version": "3.972.10",
        "direct": false
      },
      {
        "name": "@aws-sdk/middleware-recursion-detection",
        "version": "3.972.11",
        "direct": false
      },
      {
        "name": "@aws-sdk/middleware-sdk-s3",
        "version": "3.972.37",
        "direct": false
      },
      {
        "name": "@aws-sdk/middleware-user-agent",
        "version": "3.972.38",
        "direct": false
      },
      {
        "name": "@aws-sdk/middleware-websocket",
        "version": "3.972.16",
        "direct": false
      },
      {
        "name": "@aws-sdk/nested-clients",
        "version": "3.997.6",
        "direct": false
      },
      {
        "name": "@aws-sdk/region-config-resolver",
        "version": "3.972.13",
        "direct": false
      },
      {
        "name": "@aws-sdk/signature-v4-multi-region",
        "version": "3.996.25",
        "direct": false
      },
      {
        "name": "@aws-sdk/token-providers",
        "version": "3.1041.0",
        "direct": false
      },
      {
        "name": "@aws-sdk/types",
        "version": "3.973.8",
        "direct": false
      },
      {
        "name": "@aws-sdk/util-arn-parser",
        "version": "3.972.3",
        "direct": false
      },
      {
        "name": "@aws-sdk/util-endpoints",
        "version": "3.996.8",
        "direct": false
      },
      {
        "name": "@aws-sdk/util-format-url",
        "version": "3.972.10",
        "direct": false
      },
      {
        "name": "@aws-sdk/util-locate-window",
        "version": "3.965.5",
        "direct": false
      },
      {
        "name": "@aws-sdk/util-user-agent-browser",
        "version": "3.972.10",
        "direct": false
      },
      {
        "name": "@aws-sdk/util-user-agent-node",
        "version": "3.973.24",
        "direct": false
      },
      {
        "name": "@aws-sdk/xml-builder",
        "version": "3.972.22",
        "direct": false
      },
      {
        "name": "@aws/lambda-invoke-store",
        "version": "0.2.4",
        "direct": false
      },
      {
        "name": "@babel/runtime",
        "version": "7.29.2",
        "direct": false
      },
      {
        "name": "@borewit/text-codec",
        "version": "0.2.2",
        "direct": false
      },
      {
        "name": "@clack/core",
        "version": "1.3.0",
        "direct": false
      },
      {
        "name": "@clack/prompts",
        "version": "1.3.0",
        "direct": false
      },
      {
        "name": "@google/genai",
        "version": "1.51.0",
        "direct": false
      },
      {
        "name": "@hono/node-server",
        "version": "1.19.14",
        "direct": false
      },
      {
        "name": "@isaacs/fs-minipass",
        "version": "4.0.1",
        "direct": false
      },
      {
        "name": "@lydell/node-pty",
        "version": "1.2.0-beta.12",
        "direct": false
      },
      {
        "name": "@lydell/node-pty-darwin-arm64",
        "version": "1.2.0-beta.12",
        "direct": false
      },
      {
        "name": "@lydell/node-pty-darwin-x64",
        "version": "1.2.0-beta.12",
        "direct": false
      },
      {
        "name": "@lydell/node-pty-linux-arm64",
        "version": "1.2.0-beta.12",
        "direct": false
      },
      {
        "name": "@lydell/node-pty-linux-x64",
        "version": "1.2.0-beta.12",
        "direct": false
      },
      {
        "name": "@lydell/node-pty-win32-arm64",
        "version": "1.2.0-beta.12",
        "direct": false
      },
      {
        "name": "@lydell/node-pty-win32-x64",
        "version": "1.2.0-beta.12",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard",
        "version": "0.3.5",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-darwin-arm64",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-darwin-universal",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-darwin-x64",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-linux-arm64-gnu",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-linux-arm64-musl",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-linux-riscv64-gnu",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-linux-x64-gnu",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-linux-x64-musl",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-win32-arm64-msvc",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/clipboard-win32-x64-msvc",
        "version": "0.3.2",
        "direct": false
      },
      {
        "name": "@mariozechner/jiti",
        "version": "2.6.5",
        "direct": false
      },
      {
        "name": "@mariozechner/pi-agent-core",
        "version": "0.70.6",
        "direct": false
      },
      {
        "name": "@mariozechner/pi-ai",
        "version": "0.70.6",
        "direct": false
      },
      {
        "name": "@mariozechner/pi-coding-agent",
        "version": "0.70.6",
        "direct": false
      },
      {
        "name": "@mariozechner/pi-tui",
        "version": "0.70.6",
        "direct": false
      },
      {
        "name": "@mistralai/mistralai",
        "version": "2.2.1",
        "direct": false
      },
      {
        "name": "@modelcontextprotocol/sdk",
        "version": "1.29.0",
        "direct": false
      },
      {
        "name": "@nodable/entities",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "@nodelib/fs.scandir",
        "version": "2.1.5",
        "direct": false
      },
      {
        "name": "@nodelib/fs.stat",
        "version": "2.0.5",
        "direct": false
      },
      {
        "name": "@nodelib/fs.walk",
        "version": "1.2.8",
        "direct": false
      },
      {
        "name": "@octokit/endpoint",
        "version": "11.0.3",
        "direct": false
      },
      {
        "name": "@octokit/graphql",
        "version": "^9.0.1",
        "direct": true
      },
      {
        "name": "@octokit/openapi-types",
        "version": "27.0.0",
        "direct": false
      },
      {
        "name": "@octokit/request",
        "version": "10.0.8",
        "direct": false
      },
      {
        "name": "@octokit/request-error",
        "version": "7.1.0",
        "direct": false
      },
      {
        "name": "@octokit/types",
        "version": "16.0.0",
        "direct": false
      },
      {
        "name": "@protobufjs/aspromise",
        "version": "1.1.2",
        "direct": false
      },
      {
        "name": "@protobufjs/base64",
        "version": "1.1.2",
        "direct": false
      },
      {
        "name": "@protobufjs/codegen",
        "version": "2.0.5",
        "direct": false
      },
      {
        "name": "@protobufjs/eventemitter",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "@protobufjs/fetch",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "@protobufjs/float",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "@protobufjs/inquire",
        "version": "1.1.1",
        "direct": false
      },
      {
        "name": "@protobufjs/path",
        "version": "1.1.2",
        "direct": false
      },
      {
        "name": "@protobufjs/pool",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "@protobufjs/utf8",
        "version": "1.1.1",
        "direct": false
      },
      {
        "name": "@silvia-odwyer/photon-node",
        "version": "0.3.4",
        "direct": false
      },
      {
        "name": "@slack/types",
        "version": "2.20.1",
        "direct": false
      },
      {
        "name": "@slack/webhook",
        "version": "^7.0.6",
        "direct": true
      },
      {
        "name": "@smithy/config-resolver",
        "version": "4.4.17",
        "direct": false
      },
      {
        "name": "@smithy/core",
        "version": "3.23.17",
        "direct": false
      },
      {
        "name": "@smithy/credential-provider-imds",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/eventstream-codec",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/eventstream-serde-browser",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/eventstream-serde-config-resolver",
        "version": "4.3.14",
        "direct": false
      },
      {
        "name": "@smithy/eventstream-serde-node",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/eventstream-serde-universal",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/fetch-http-handler",
        "version": "5.3.17",
        "direct": false
      },
      {
        "name": "@smithy/hash-node",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/invalid-dependency",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/is-array-buffer",
        "version": "2.2.0",
        "direct": false
      },
      {
        "name": "@smithy/middleware-content-length",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/middleware-endpoint",
        "version": "4.4.32",
        "direct": false
      },
      {
        "name": "@smithy/middleware-retry",
        "version": "4.5.7",
        "direct": false
      },
      {
        "name": "@smithy/middleware-serde",
        "version": "4.2.20",
        "direct": false
      },
      {
        "name": "@smithy/middleware-stack",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/node-config-provider",
        "version": "4.3.14",
        "direct": false
      },
      {
        "name": "@smithy/node-http-handler",
        "version": "4.6.1",
        "direct": false
      },
      {
        "name": "@smithy/property-provider",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/protocol-http",
        "version": "5.3.14",
        "direct": false
      },
      {
        "name": "@smithy/querystring-builder",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/querystring-parser",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/service-error-classification",
        "version": "4.3.1",
        "direct": false
      },
      {
        "name": "@smithy/shared-ini-file-loader",
        "version": "4.4.9",
        "direct": false
      },
      {
        "name": "@smithy/signature-v4",
        "version": "5.3.14",
        "direct": false
      },
      {
        "name": "@smithy/smithy-client",
        "version": "4.12.13",
        "direct": false
      },
      {
        "name": "@smithy/types",
        "version": "4.14.1",
        "direct": false
      },
      {
        "name": "@smithy/url-parser",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/util-base64",
        "version": "4.3.2",
        "direct": false
      },
      {
        "name": "@smithy/util-body-length-browser",
        "version": "4.2.2",
        "direct": false
      },
      {
        "name": "@smithy/util-body-length-node",
        "version": "4.2.3",
        "direct": false
      },
      {
        "name": "@smithy/util-buffer-from",
        "version": "2.2.0",
        "direct": false
      },
      {
        "name": "@smithy/util-config-provider",
        "version": "4.2.2",
        "direct": false
      },
      {
        "name": "@smithy/util-defaults-mode-browser",
        "version": "4.3.49",
        "direct": false
      },
      {
        "name": "@smithy/util-defaults-mode-node",
        "version": "4.2.54",
        "direct": false
      },
      {
        "name": "@smithy/util-endpoints",
        "version": "3.4.2",
        "direct": false
      },
      {
        "name": "@smithy/util-hex-encoding",
        "version": "4.2.2",
        "direct": false
      },
      {
        "name": "@smithy/util-middleware",
        "version": "4.2.14",
        "direct": false
      },
      {
        "name": "@smithy/util-retry",
        "version": "4.3.8",
        "direct": false
      },
      {
        "name": "@smithy/util-stream",
        "version": "4.5.25",
        "direct": false
      },
      {
        "name": "@smithy/util-uri-escape",
        "version": "4.2.2",
        "direct": false
      },
      {
        "name": "@smithy/util-utf8",
        "version": "2.3.0",
        "direct": false
      },
      {
        "name": "@smithy/uuid",
        "version": "1.1.2",
        "direct": false
      },
      {
        "name": "@tokenizer/inflate",
        "version": "0.4.1",
        "direct": false
      },
      {
        "name": "@tokenizer/token",
        "version": "0.3.0",
        "direct": false
      },
      {
        "name": "@tootallnate/quickjs-emscripten",
        "version": "0.23.0",
        "direct": false
      },
      {
        "name": "@types/mime-types",
        "version": "2.1.4",
        "direct": false
      },
      {
        "name": "@types/node",
        "version": "25.6.0",
        "direct": false
      },
      {
        "name": "@types/retry",
        "version": "0.12.0",
        "direct": false
      },
      {
        "name": "@types/yauzl",
        "version": "2.10.3",
        "direct": false
      },
      {
        "name": "accepts",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "agent-base",
        "version": "7.1.4",
        "direct": false
      },
      {
        "name": "ajv",
        "version": "8.20.0",
        "direct": false
      },
      {
        "name": "ajv-formats",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "ansi-regex",
        "version": "6.2.2",
        "direct": false
      },
      {
        "name": "ansi-styles",
        "version": "4.3.0",
        "direct": false
      },
      {
        "name": "any-promise",
        "version": "1.3.0",
        "direct": false
      },
      {
        "name": "argparse",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "asn1.js",
        "version": "5.4.1",
        "direct": false
      },
      {
        "name": "ast-types",
        "version": "0.13.4",
        "direct": false
      },
      {
        "name": "asynckit",
        "version": "0.4.0",
        "direct": false
      },
      {
        "name": "axios",
        "version": "^1.9.0",
        "direct": true
      },
      {
        "name": "balanced-match",
        "version": "4.0.4",
        "direct": false
      },
      {
        "name": "base64-js",
        "version": "1.5.1",
        "direct": false
      },
      {
        "name": "basic-ftp",
        "version": "5.3.1",
        "direct": false
      },
      {
        "name": "bignumber.js",
        "version": "9.3.1",
        "direct": false
      },
      {
        "name": "bn.js",
        "version": "4.12.3",
        "direct": false
      },
      {
        "name": "body-parser",
        "version": "2.2.2",
        "direct": false
      },
      {
        "name": "bowser",
        "version": "2.14.1",
        "direct": false
      },
      {
        "name": "brace-expansion",
        "version": "5.0.5",
        "direct": false
      },
      {
        "name": "braces",
        "version": "3.0.3",
        "direct": false
      },
      {
        "name": "buffer-crc32",
        "version": "0.2.13",
        "direct": false
      },
      {
        "name": "buffer-equal-constant-time",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "bytes",
        "version": "3.1.2",
        "direct": false
      },
      {
        "name": "call-bind-apply-helpers",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "call-bound",
        "version": "1.0.4",
        "direct": false
      },
      {
        "name": "camelcase",
        "version": "5.3.1",
        "direct": false
      },
      {
        "name": "chalk",
        "version": "5.6.2",
        "direct": false
      },
      {
        "name": "chokidar",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "chownr",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "cli-highlight",
        "version": "2.1.11",
        "direct": false
      },
      {
        "name": "cliui",
        "version": "7.0.4",
        "direct": false
      },
      {
        "name": "color-convert",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "color-name",
        "version": "1.1.4",
        "direct": false
      },
      {
        "name": "combined-stream",
        "version": "1.0.8",
        "direct": false
      },
      {
        "name": "commander",
        "version": "14.0.3",
        "direct": false
      },
      {
        "name": "content-disposition",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "content-type",
        "version": "1.0.5",
        "direct": false
      },
      {
        "name": "cookie",
        "version": "0.7.2",
        "direct": false
      },
      {
        "name": "cookie-signature",
        "version": "1.2.2",
        "direct": false
      },
      {
        "name": "core-util-is",
        "version": "1.0.3",
        "direct": false
      },
      {
        "name": "cors",
        "version": "2.8.6",
        "direct": false
      },
      {
        "name": "croner",
        "version": "10.0.1",
        "direct": false
      },
      {
        "name": "cross-spawn",
        "version": "7.0.6",
        "direct": false
      },
      {
        "name": "data-uri-to-buffer",
        "version": "6.0.2",
        "direct": false
      },
      {
        "name": "date-fns",
        "version": "^4.1.0",
        "direct": true
      },
      {
        "name": "debug",
        "version": "4.4.3",
        "direct": false
      },
      {
        "name": "decamelize",
        "version": "1.2.0",
        "direct": false
      },
      {
        "name": "define-data-property",
        "version": "1.1.4",
        "direct": false
      },
      {
        "name": "define-properties",
        "version": "1.2.1",
        "direct": false
      },
      {
        "name": "degenerator",
        "version": "5.0.1",
        "direct": false
      },
      {
        "name": "delayed-stream",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "depd",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "diff",
        "version": "8.0.4",
        "direct": false
      },
      {
        "name": "dijkstrajs",
        "version": "1.0.3",
        "direct": false
      },
      {
        "name": "dotenv",
        "version": "^16.5.0",
        "direct": true
      },
      {
        "name": "dunder-proto",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "ecdsa-sig-formatter",
        "version": "1.0.11",
        "direct": false
      },
      {
        "name": "ee-first",
        "version": "1.1.1",
        "direct": false
      },
      {
        "name": "emoji-regex",
        "version": "8.0.0",
        "direct": false
      },
      {
        "name": "encodeurl",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "end-of-stream",
        "version": "1.4.5",
        "direct": false
      },
      {
        "name": "entities",
        "version": "4.5.0",
        "direct": false
      },
      {
        "name": "es-define-property",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "es-errors",
        "version": "1.3.0",
        "direct": false
      },
      {
        "name": "es-object-atoms",
        "version": "1.1.1",
        "direct": false
      },
      {
        "name": "es-set-tostringtag",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "escalade",
        "version": "3.2.0",
        "direct": false
      },
      {
        "name": "escape-html",
        "version": "1.0.3",
        "direct": false
      },
      {
        "name": "escape-string-regexp",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "escodegen",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "esprima",
        "version": "4.0.1",
        "direct": false
      },
      {
        "name": "estraverse",
        "version": "5.3.0",
        "direct": false
      },
      {
        "name": "esutils",
        "version": "2.0.3",
        "direct": false
      },
      {
        "name": "etag",
        "version": "1.8.1",
        "direct": false
      },
      {
        "name": "eventsource",
        "version": "3.0.7",
        "direct": false
      },
      {
        "name": "eventsource-parser",
        "version": "3.0.8",
        "direct": false
      },
      {
        "name": "express",
        "version": "5.2.1",
        "direct": false
      },
      {
        "name": "express-rate-limit",
        "version": "8.4.1",
        "direct": false
      },
      {
        "name": "extend",
        "version": "3.0.2",
        "direct": false
      },
      {
        "name": "extract-zip",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "fast-content-type-parse",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "fast-deep-equal",
        "version": "3.1.3",
        "direct": false
      },
      {
        "name": "fast-glob",
        "version": "^3.3.3",
        "direct": true
      },
      {
        "name": "fast-string-truncated-width",
        "version": "3.0.3",
        "direct": false
      },
      {
        "name": "fast-string-width",
        "version": "3.0.2",
        "direct": false
      },
      {
        "name": "fast-uri",
        "version": "3.1.0",
        "direct": false
      },
      {
        "name": "fast-wrap-ansi",
        "version": "0.2.0",
        "direct": false
      },
      {
        "name": "fast-xml-builder",
        "version": "1.1.5",
        "direct": false
      },
      {
        "name": "fast-xml-parser",
        "version": "5.7.2",
        "direct": false
      },
      {
        "name": "fastq",
        "version": "1.20.1",
        "direct": false
      },
      {
        "name": "fd-slicer",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "fetch-blob",
        "version": "3.2.0",
        "direct": false
      },
      {
        "name": "file-type",
        "version": "21.3.4",
        "direct": false
      },
      {
        "name": "fill-range",
        "version": "7.1.1",
        "direct": false
      },
      {
        "name": "finalhandler",
        "version": "2.1.1",
        "direct": false
      },
      {
        "name": "find-up",
        "version": "4.1.0",
        "direct": false
      },
      {
        "name": "follow-redirects",
        "version": "1.16.0",
        "direct": false
      },
      {
        "name": "form-data",
        "version": "4.0.5",
        "direct": false
      },
      {
        "name": "formdata-polyfill",
        "version": "4.0.10",
        "direct": false
      },
      {
        "name": "forwarded",
        "version": "0.2.0",
        "direct": false
      },
      {
        "name": "fresh",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "function-bind",
        "version": "1.1.2",
        "direct": false
      },
      {
        "name": "gaxios",
        "version": "7.1.4",
        "direct": false
      },
      {
        "name": "gcp-metadata",
        "version": "8.1.2",
        "direct": false
      },
      {
        "name": "get-caller-file",
        "version": "2.0.5",
        "direct": false
      },
      {
        "name": "get-east-asian-width",
        "version": "1.5.0",
        "direct": false
      },
      {
        "name": "get-intrinsic",
        "version": "1.3.0",
        "direct": false
      },
      {
        "name": "get-proto",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "get-stream",
        "version": "5.2.0",
        "direct": false
      },
      {
        "name": "get-uri",
        "version": "6.0.5",
        "direct": false
      },
      {
        "name": "glob",
        "version": "13.0.6",
        "direct": false
      },
      {
        "name": "glob-parent",
        "version": "5.1.2",
        "direct": false
      },
      {
        "name": "global-agent",
        "version": "4.1.3",
        "direct": false
      },
      {
        "name": "globalthis",
        "version": "1.0.4",
        "direct": false
      },
      {
        "name": "google-auth-library",
        "version": "10.6.2",
        "direct": false
      },
      {
        "name": "google-logging-utils",
        "version": "1.1.3",
        "direct": false
      },
      {
        "name": "gopd",
        "version": "1.2.0",
        "direct": false
      },
      {
        "name": "graceful-fs",
        "version": "4.2.11",
        "direct": false
      },
      {
        "name": "has-flag",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "has-property-descriptors",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "has-symbols",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "has-tostringtag",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "hasown",
        "version": "2.0.3",
        "direct": false
      },
      {
        "name": "highlight.js",
        "version": "10.7.3",
        "direct": false
      },
      {
        "name": "hono",
        "version": "4.12.16",
        "direct": false
      },
      {
        "name": "hosted-git-info",
        "version": "9.0.3",
        "direct": false
      },
      {
        "name": "http_ece",
        "version": "1.2.0",
        "direct": false
      },
      {
        "name": "http-errors",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "http-proxy-agent",
        "version": "7.0.2",
        "direct": false
      },
      {
        "name": "https-proxy-agent",
        "version": "7.0.6",
        "direct": false
      },
      {
        "name": "iconv-lite",
        "version": "0.7.2",
        "direct": false
      },
      {
        "name": "ieee754",
        "version": "1.2.1",
        "direct": false
      },
      {
        "name": "ignore",
        "version": "7.0.5",
        "direct": false
      },
      {
        "name": "immediate",
        "version": "3.0.6",
        "direct": false
      },
      {
        "name": "inherits",
        "version": "2.0.4",
        "direct": false
      },
      {
        "name": "ip-address",
        "version": "10.1.0",
        "direct": false
      },
      {
        "name": "ipaddr.js",
        "version": "2.3.0",
        "direct": false
      },
      {
        "name": "is-extglob",
        "version": "2.1.1",
        "direct": false
      },
      {
        "name": "is-fullwidth-code-point",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "is-glob",
        "version": "4.0.3",
        "direct": false
      },
      {
        "name": "is-number",
        "version": "7.0.0",
        "direct": false
      },
      {
        "name": "is-promise",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "isarray",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "isexe",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "jiti",
        "version": "2.6.1",
        "direct": false
      },
      {
        "name": "jose",
        "version": "6.2.3",
        "direct": false
      },
      {
        "name": "json-bigint",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "json-schema-to-ts",
        "version": "3.1.1",
        "direct": false
      },
      {
        "name": "json-schema-traverse",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "json-schema-typed",
        "version": "8.0.2",
        "direct": false
      },
      {
        "name": "json-with-bigint",
        "version": "3.5.8",
        "direct": false
      },
      {
        "name": "json5",
        "version": "2.2.3",
        "direct": false
      },
      {
        "name": "jszip",
        "version": "3.10.1",
        "direct": false
      },
      {
        "name": "jwa",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "jws",
        "version": "4.0.1",
        "direct": false
      },
      {
        "name": "koffi",
        "version": "2.16.1",
        "direct": false
      },
      {
        "name": "lie",
        "version": "3.3.0",
        "direct": false
      },
      {
        "name": "linkify-it",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "locate-path",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "long",
        "version": "5.3.2",
        "direct": false
      },
      {
        "name": "lru-cache",
        "version": "7.18.3",
        "direct": false
      },
      {
        "name": "markdown-it",
        "version": "14.1.1",
        "direct": false
      },
      {
        "name": "marked",
        "version": "15.0.12",
        "direct": false
      },
      {
        "name": "matcher",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "math-intrinsics",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "mdurl",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "media-typer",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "merge-descriptors",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "merge2",
        "version": "1.4.1",
        "direct": false
      },
      {
        "name": "micromatch",
        "version": "4.0.8",
        "direct": false
      },
      {
        "name": "mime-db",
        "version": "1.54.0",
        "direct": false
      },
      {
        "name": "mime-types",
        "version": "3.0.2",
        "direct": false
      },
      {
        "name": "minimalistic-assert",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "minimatch",
        "version": "10.2.5",
        "direct": false
      },
      {
        "name": "minimist",
        "version": "1.2.8",
        "direct": false
      },
      {
        "name": "minipass",
        "version": "7.1.3",
        "direct": false
      },
      {
        "name": "minizlib",
        "version": "3.1.0",
        "direct": false
      },
      {
        "name": "ms",
        "version": "2.1.3",
        "direct": false
      },
      {
        "name": "mz",
        "version": "2.7.0",
        "direct": false
      },
      {
        "name": "negotiator",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "netmask",
        "version": "2.1.1",
        "direct": false
      },
      {
        "name": "node-domexception",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "node-fetch",
        "version": "3.3.2",
        "direct": false
      },
      {
        "name": "object-assign",
        "version": "4.1.1",
        "direct": false
      },
      {
        "name": "object-inspect",
        "version": "1.13.4",
        "direct": false
      },
      {
        "name": "object-keys",
        "version": "1.1.1",
        "direct": false
      },
      {
        "name": "on-finished",
        "version": "2.4.1",
        "direct": false
      },
      {
        "name": "once",
        "version": "1.4.0",
        "direct": false
      },
      {
        "name": "openai",
        "version": "6.26.0",
        "direct": false
      },
      {
        "name": "openclaw",
        "version": "^2026.4.29",
        "direct": true
      },
      {
        "name": "p-limit",
        "version": "^7.1.1",
        "direct": true
      },
      {
        "name": "p-locate",
        "version": "4.1.0",
        "direct": false
      },
      {
        "name": "p-retry",
        "version": "4.6.2",
        "direct": false
      },
      {
        "name": "p-try",
        "version": "2.2.0",
        "direct": false
      },
      {
        "name": "pac-proxy-agent",
        "version": "7.2.0",
        "direct": false
      },
      {
        "name": "pac-resolver",
        "version": "7.0.1",
        "direct": false
      },
      {
        "name": "pako",
        "version": "1.0.11",
        "direct": false
      },
      {
        "name": "parse5",
        "version": "5.1.1",
        "direct": false
      },
      {
        "name": "parse5-htmlparser2-tree-adapter",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "parseurl",
        "version": "1.3.3",
        "direct": false
      },
      {
        "name": "partial-json",
        "version": "0.1.7",
        "direct": false
      },
      {
        "name": "path-exists",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "path-expression-matcher",
        "version": "1.5.0",
        "direct": false
      },
      {
        "name": "path-key",
        "version": "3.1.1",
        "direct": false
      },
      {
        "name": "path-scurry",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "path-to-regexp",
        "version": "8.4.2",
        "direct": false
      },
      {
        "name": "pend",
        "version": "1.2.0",
        "direct": false
      },
      {
        "name": "picomatch",
        "version": "2.3.2",
        "direct": false
      },
      {
        "name": "pkce-challenge",
        "version": "5.0.1",
        "direct": false
      },
      {
        "name": "pngjs",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "process-nextick-args",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "proper-lockfile",
        "version": "4.1.2",
        "direct": false
      },
      {
        "name": "protobufjs",
        "version": "7.5.6",
        "direct": false
      },
      {
        "name": "proxy-addr",
        "version": "2.0.7",
        "direct": false
      },
      {
        "name": "proxy-agent",
        "version": "6.5.0",
        "direct": false
      },
      {
        "name": "proxy-from-env",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "pump",
        "version": "3.0.4",
        "direct": false
      },
      {
        "name": "punycode.js",
        "version": "2.3.1",
        "direct": false
      },
      {
        "name": "qrcode",
        "version": "1.5.4",
        "direct": false
      },
      {
        "name": "qs",
        "version": "6.15.1",
        "direct": false
      },
      {
        "name": "queue-microtask",
        "version": "1.2.3",
        "direct": false
      },
      {
        "name": "quickjs-wasi",
        "version": "2.2.0",
        "direct": false
      },
      {
        "name": "range-parser",
        "version": "1.2.1",
        "direct": false
      },
      {
        "name": "raw-body",
        "version": "3.0.2",
        "direct": false
      },
      {
        "name": "readable-stream",
        "version": "2.3.8",
        "direct": false
      },
      {
        "name": "readdirp",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "require-directory",
        "version": "2.1.1",
        "direct": false
      },
      {
        "name": "require-from-string",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "require-main-filename",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "retry",
        "version": "0.12.0",
        "direct": false
      },
      {
        "name": "reusify",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "router",
        "version": "2.2.0",
        "direct": false
      },
      {
        "name": "run-parallel",
        "version": "1.2.0",
        "direct": false
      },
      {
        "name": "safe-buffer",
        "version": "5.1.2",
        "direct": false
      },
      {
        "name": "safer-buffer",
        "version": "2.1.2",
        "direct": false
      },
      {
        "name": "semver",
        "version": "7.7.4",
        "direct": false
      },
      {
        "name": "send",
        "version": "1.2.1",
        "direct": false
      },
      {
        "name": "serialize-error",
        "version": "8.1.0",
        "direct": false
      },
      {
        "name": "serve-static",
        "version": "2.2.1",
        "direct": false
      },
      {
        "name": "set-blocking",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "setimmediate",
        "version": "1.0.5",
        "direct": false
      },
      {
        "name": "setprototypeof",
        "version": "1.2.0",
        "direct": false
      },
      {
        "name": "shebang-command",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "shebang-regex",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "side-channel",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "side-channel-list",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "side-channel-map",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "side-channel-weakmap",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "signal-exit",
        "version": "3.0.7",
        "direct": false
      },
      {
        "name": "sisteransi",
        "version": "1.0.5",
        "direct": false
      },
      {
        "name": "smart-buffer",
        "version": "4.2.0",
        "direct": false
      },
      {
        "name": "socks",
        "version": "2.8.8",
        "direct": false
      },
      {
        "name": "socks-proxy-agent",
        "version": "8.0.5",
        "direct": false
      },
      {
        "name": "source-map",
        "version": "0.6.1",
        "direct": false
      },
      {
        "name": "sqlite-vec",
        "version": "0.1.9",
        "direct": false
      },
      {
        "name": "sqlite-vec-darwin-arm64",
        "version": "0.1.9",
        "direct": false
      },
      {
        "name": "sqlite-vec-darwin-x64",
        "version": "0.1.9",
        "direct": false
      },
      {
        "name": "sqlite-vec-linux-arm64",
        "version": "0.1.9",
        "direct": false
      },
      {
        "name": "sqlite-vec-linux-x64",
        "version": "0.1.9",
        "direct": false
      },
      {
        "name": "sqlite-vec-windows-x64",
        "version": "0.1.9",
        "direct": false
      },
      {
        "name": "statuses",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "std-env",
        "version": "3.10.0",
        "direct": false
      },
      {
        "name": "string_decoder",
        "version": "1.1.1",
        "direct": false
      },
      {
        "name": "string-width",
        "version": "4.2.3",
        "direct": false
      },
      {
        "name": "strip-ansi",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "strnum",
        "version": "2.2.3",
        "direct": false
      },
      {
        "name": "strtok3",
        "version": "10.3.5",
        "direct": false
      },
      {
        "name": "supports-color",
        "version": "7.2.0",
        "direct": false
      },
      {
        "name": "tar",
        "version": "7.5.13",
        "direct": false
      },
      {
        "name": "thenify",
        "version": "3.3.1",
        "direct": false
      },
      {
        "name": "thenify-all",
        "version": "1.6.0",
        "direct": false
      },
      {
        "name": "to-regex-range",
        "version": "5.0.1",
        "direct": false
      },
      {
        "name": "toidentifier",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "token-types",
        "version": "6.1.2",
        "direct": false
      },
      {
        "name": "toml",
        "version": "^3.0.0",
        "direct": true
      },
      {
        "name": "ts-algebra",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "tslib",
        "version": "2.8.1",
        "direct": false
      },
      {
        "name": "tslog",
        "version": "4.10.2",
        "direct": false
      },
      {
        "name": "type-fest",
        "version": "0.20.2",
        "direct": false
      },
      {
        "name": "type-is",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "typebox",
        "version": "1.1.34",
        "direct": false
      },
      {
        "name": "uc.micro",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "uint8array-extras",
        "version": "1.5.0",
        "direct": false
      },
      {
        "name": "undici",
        "version": "7.25.0",
        "direct": false
      },
      {
        "name": "undici-types",
        "version": "7.19.2",
        "direct": false
      },
      {
        "name": "universal-user-agent",
        "version": "7.0.3",
        "direct": false
      },
      {
        "name": "unpipe",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "util-deprecate",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "uuid",
        "version": "14.0.0",
        "direct": false
      },
      {
        "name": "vary",
        "version": "1.1.2",
        "direct": false
      },
      {
        "name": "web-push",
        "version": "3.6.7",
        "direct": false
      },
      {
        "name": "web-streams-polyfill",
        "version": "3.3.3",
        "direct": false
      },
      {
        "name": "which",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "which-module",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "wrap-ansi",
        "version": "6.2.0",
        "direct": false
      },
      {
        "name": "wrappy",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "ws",
        "version": "8.20.0",
        "direct": false
      },
      {
        "name": "y18n",
        "version": "4.0.3",
        "direct": false
      },
      {
        "name": "yallist",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "yaml",
        "version": "^2.8.0",
        "direct": true
      },
      {
        "name": "yargs",
        "version": "15.4.1",
        "direct": false
      },
      {
        "name": "yargs-parser",
        "version": "18.1.3",
        "direct": false
      },
      {
        "name": "yauzl",
        "version": "2.10.0",
        "direct": false
      },
      {
        "name": "yocto-queue",
        "version": "1.2.2",
        "direct": false
      },
      {
        "name": "yoctocolors",
        "version": "2.1.2",
        "direct": false
      },
      {
        "name": "zod",
        "version": "4.4.2",
        "direct": false
      },
      {
        "name": "zod-to-json-schema",
        "version": "3.25.2",
        "direct": false
      }
    ],
    "edges": {
      "@anthropic-ai/sdk": [
        "json-schema-to-ts"
      ],
      "@aws-crypto/crc32": [
        "@aws-crypto/util",
        "@aws-sdk/types",
        "tslib"
      ],
      "@aws-crypto/sha256-browser": [
        "@aws-crypto/sha256-js",
        "@aws-crypto/supports-web-crypto",
        "@aws-crypto/util",
        "@aws-sdk/types",
        "@aws-sdk/util-locate-window",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@aws-crypto/sha256-js": [
        "@aws-crypto/util",
        "@aws-sdk/types",
        "tslib"
      ],
      "@aws-crypto/supports-web-crypto": [
        "tslib"
      ],
      "@aws-crypto/util": [
        "@aws-sdk/types",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@aws-sdk/client-bedrock-runtime": [
        "@aws-crypto/sha256-browser",
        "@aws-crypto/sha256-js",
        "@aws-sdk/core",
        "@aws-sdk/credential-provider-node",
        "@aws-sdk/eventstream-handler-node",
        "@aws-sdk/middleware-eventstream",
        "@aws-sdk/middleware-host-header",
        "@aws-sdk/middleware-logger",
        "@aws-sdk/middleware-recursion-detection",
        "@aws-sdk/middleware-user-agent",
        "@aws-sdk/middleware-websocket",
        "@aws-sdk/region-config-resolver",
        "@aws-sdk/token-providers",
        "@aws-sdk/types",
        "@aws-sdk/util-endpoints",
        "@aws-sdk/util-user-agent-browser",
        "@aws-sdk/util-user-agent-node",
        "@smithy/config-resolver",
        "@smithy/core",
        "@smithy/eventstream-serde-browser",
        "@smithy/eventstream-serde-config-resolver",
        "@smithy/eventstream-serde-node",
        "@smithy/fetch-http-handler",
        "@smithy/hash-node",
        "@smithy/invalid-dependency",
        "@smithy/middleware-content-length",
        "@smithy/middleware-endpoint",
        "@smithy/middleware-retry",
        "@smithy/middleware-serde",
        "@smithy/middleware-stack",
        "@smithy/node-config-provider",
        "@smithy/node-http-handler",
        "@smithy/protocol-http",
        "@smithy/smithy-client",
        "@smithy/types",
        "@smithy/url-parser",
        "@smithy/util-base64",
        "@smithy/util-body-length-browser",
        "@smithy/util-body-length-node",
        "@smithy/util-defaults-mode-browser",
        "@smithy/util-defaults-mode-node",
        "@smithy/util-endpoints",
        "@smithy/util-middleware",
        "@smithy/util-retry",
        "@smithy/util-stream",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@aws-sdk/core": [
        "@aws-sdk/types",
        "@aws-sdk/xml-builder",
        "@smithy/core",
        "@smithy/node-config-provider",
        "@smithy/property-provider",
        "@smithy/protocol-http",
        "@smithy/signature-v4",
        "@smithy/smithy-client",
        "@smithy/types",
        "@smithy/util-base64",
        "@smithy/util-middleware",
        "@smithy/util-retry",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@aws-sdk/credential-provider-env": [
        "@aws-sdk/core",
        "@aws-sdk/types",
        "@smithy/property-provider",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/credential-provider-http": [
        "@aws-sdk/core",
        "@aws-sdk/types",
        "@smithy/fetch-http-handler",
        "@smithy/node-http-handler",
        "@smithy/property-provider",
        "@smithy/protocol-http",
        "@smithy/smithy-client",
        "@smithy/types",
        "@smithy/util-stream",
        "tslib"
      ],
      "@aws-sdk/credential-provider-ini": [
        "@aws-sdk/core",
        "@aws-sdk/credential-provider-env",
        "@aws-sdk/credential-provider-http",
        "@aws-sdk/credential-provider-login",
        "@aws-sdk/credential-provider-process",
        "@aws-sdk/credential-provider-sso",
        "@aws-sdk/credential-provider-web-identity",
        "@aws-sdk/nested-clients",
        "@aws-sdk/types",
        "@smithy/credential-provider-imds",
        "@smithy/property-provider",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/credential-provider-login": [
        "@aws-sdk/core",
        "@aws-sdk/nested-clients",
        "@aws-sdk/types",
        "@smithy/property-provider",
        "@smithy/protocol-http",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/credential-provider-node": [
        "@aws-sdk/credential-provider-env",
        "@aws-sdk/credential-provider-http",
        "@aws-sdk/credential-provider-ini",
        "@aws-sdk/credential-provider-process",
        "@aws-sdk/credential-provider-sso",
        "@aws-sdk/credential-provider-web-identity",
        "@aws-sdk/types",
        "@smithy/credential-provider-imds",
        "@smithy/property-provider",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/credential-provider-process": [
        "@aws-sdk/core",
        "@aws-sdk/types",
        "@smithy/property-provider",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/credential-provider-sso": [
        "@aws-sdk/core",
        "@aws-sdk/nested-clients",
        "@aws-sdk/token-providers",
        "@aws-sdk/types",
        "@smithy/property-provider",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/credential-provider-web-identity": [
        "@aws-sdk/core",
        "@aws-sdk/nested-clients",
        "@aws-sdk/types",
        "@smithy/property-provider",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/eventstream-handler-node": [
        "@aws-sdk/types",
        "@smithy/eventstream-codec",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/middleware-eventstream": [
        "@aws-sdk/types",
        "@smithy/protocol-http",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/middleware-host-header": [
        "@aws-sdk/types",
        "@smithy/protocol-http",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/middleware-logger": [
        "@aws-sdk/types",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/middleware-recursion-detection": [
        "@aws-sdk/types",
        "@aws/lambda-invoke-store",
        "@smithy/protocol-http",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/middleware-sdk-s3": [
        "@aws-sdk/core",
        "@aws-sdk/types",
        "@aws-sdk/util-arn-parser",
        "@smithy/core",
        "@smithy/node-config-provider",
        "@smithy/protocol-http",
        "@smithy/signature-v4",
        "@smithy/smithy-client",
        "@smithy/types",
        "@smithy/util-config-provider",
        "@smithy/util-middleware",
        "@smithy/util-stream",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@aws-sdk/middleware-user-agent": [
        "@aws-sdk/core",
        "@aws-sdk/types",
        "@aws-sdk/util-endpoints",
        "@smithy/core",
        "@smithy/protocol-http",
        "@smithy/types",
        "@smithy/util-retry",
        "tslib"
      ],
      "@aws-sdk/middleware-websocket": [
        "@aws-sdk/types",
        "@aws-sdk/util-format-url",
        "@smithy/eventstream-codec",
        "@smithy/eventstream-serde-browser",
        "@smithy/fetch-http-handler",
        "@smithy/protocol-http",
        "@smithy/signature-v4",
        "@smithy/types",
        "@smithy/util-base64",
        "@smithy/util-hex-encoding",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@aws-sdk/nested-clients": [
        "@aws-crypto/sha256-browser",
        "@aws-crypto/sha256-js",
        "@aws-sdk/core",
        "@aws-sdk/middleware-host-header",
        "@aws-sdk/middleware-logger",
        "@aws-sdk/middleware-recursion-detection",
        "@aws-sdk/middleware-user-agent",
        "@aws-sdk/region-config-resolver",
        "@aws-sdk/signature-v4-multi-region",
        "@aws-sdk/types",
        "@aws-sdk/util-endpoints",
        "@aws-sdk/util-user-agent-browser",
        "@aws-sdk/util-user-agent-node",
        "@smithy/config-resolver",
        "@smithy/core",
        "@smithy/fetch-http-handler",
        "@smithy/hash-node",
        "@smithy/invalid-dependency",
        "@smithy/middleware-content-length",
        "@smithy/middleware-endpoint",
        "@smithy/middleware-retry",
        "@smithy/middleware-serde",
        "@smithy/middleware-stack",
        "@smithy/node-config-provider",
        "@smithy/node-http-handler",
        "@smithy/protocol-http",
        "@smithy/smithy-client",
        "@smithy/types",
        "@smithy/url-parser",
        "@smithy/util-base64",
        "@smithy/util-body-length-browser",
        "@smithy/util-body-length-node",
        "@smithy/util-defaults-mode-browser",
        "@smithy/util-defaults-mode-node",
        "@smithy/util-endpoints",
        "@smithy/util-middleware",
        "@smithy/util-retry",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@aws-sdk/region-config-resolver": [
        "@aws-sdk/types",
        "@smithy/config-resolver",
        "@smithy/node-config-provider",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/signature-v4-multi-region": [
        "@aws-sdk/middleware-sdk-s3",
        "@aws-sdk/types",
        "@smithy/protocol-http",
        "@smithy/signature-v4",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/token-providers": [
        "@aws-sdk/core",
        "@aws-sdk/nested-clients",
        "@aws-sdk/types",
        "@smithy/property-provider",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/types": [
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/util-arn-parser": [
        "tslib"
      ],
      "@aws-sdk/util-endpoints": [
        "@aws-sdk/types",
        "@smithy/types",
        "@smithy/url-parser",
        "@smithy/util-endpoints",
        "tslib"
      ],
      "@aws-sdk/util-format-url": [
        "@aws-sdk/types",
        "@smithy/querystring-builder",
        "@smithy/types",
        "tslib"
      ],
      "@aws-sdk/util-locate-window": [
        "tslib"
      ],
      "@aws-sdk/util-user-agent-browser": [
        "@aws-sdk/types",
        "@smithy/types",
        "bowser",
        "tslib"
      ],
      "@aws-sdk/util-user-agent-node": [
        "@aws-sdk/middleware-user-agent",
        "@aws-sdk/types",
        "@smithy/node-config-provider",
        "@smithy/types",
        "@smithy/util-config-provider",
        "tslib"
      ],
      "@aws-sdk/xml-builder": [
        "@nodable/entities",
        "@smithy/types",
        "fast-xml-parser",
        "tslib"
      ],
      "@clack/core": [
        "fast-wrap-ansi",
        "sisteransi"
      ],
      "@clack/prompts": [
        "@clack/core",
        "fast-string-width",
        "fast-wrap-ansi",
        "sisteransi"
      ],
      "@google/genai": [
        "google-auth-library",
        "p-retry",
        "protobufjs",
        "ws"
      ],
      "@isaacs/fs-minipass": [
        "minipass"
      ],
      "@mariozechner/jiti": [
        "std-env",
        "yoctocolors"
      ],
      "@mariozechner/pi-agent-core": [
        "@mariozechner/pi-ai",
        "typebox"
      ],
      "@mariozechner/pi-ai": [
        "@anthropic-ai/sdk",
        "@aws-sdk/client-bedrock-runtime",
        "@google/genai",
        "@mistralai/mistralai",
        "chalk",
        "openai",
        "partial-json",
        "proxy-agent",
        "typebox",
        "undici",
        "zod-to-json-schema"
      ],
      "@mariozechner/pi-coding-agent": [
        "@mariozechner/jiti",
        "@mariozechner/pi-agent-core",
        "@mariozechner/pi-ai",
        "@mariozechner/pi-tui",
        "@silvia-odwyer/photon-node",
        "chalk",
        "cli-highlight",
        "diff",
        "extract-zip",
        "file-type",
        "glob",
        "hosted-git-info",
        "ignore",
        "marked",
        "minimatch",
        "proper-lockfile",
        "strip-ansi",
        "typebox",
        "undici",
        "uuid",
        "yaml"
      ],
      "@mariozechner/pi-tui": [
        "@types/mime-types",
        "chalk",
        "get-east-asian-width",
        "marked",
        "mime-types"
      ],
      "@mistralai/mistralai": [
        "ws",
        "zod",
        "zod-to-json-schema"
      ],
      "@modelcontextprotocol/sdk": [
        "@hono/node-server",
        "ajv",
        "ajv-formats",
        "content-type",
        "cors",
        "cross-spawn",
        "eventsource",
        "eventsource-parser",
        "express",
        "express-rate-limit",
        "hono",
        "jose",
        "json-schema-typed",
        "pkce-challenge",
        "raw-body",
        "zod",
        "zod-to-json-schema"
      ],
      "@nodelib/fs.scandir": [
        "@nodelib/fs.stat",
        "run-parallel"
      ],
      "@nodelib/fs.walk": [
        "@nodelib/fs.scandir",
        "fastq"
      ],
      "@octokit/endpoint": [
        "@octokit/types",
        "universal-user-agent"
      ],
      "@octokit/graphql": [
        "@octokit/request",
        "@octokit/types",
        "universal-user-agent"
      ],
      "@octokit/request": [
        "@octokit/endpoint",
        "@octokit/request-error",
        "@octokit/types",
        "fast-content-type-parse",
        "json-with-bigint",
        "universal-user-agent"
      ],
      "@octokit/request-error": [
        "@octokit/types"
      ],
      "@octokit/types": [
        "@octokit/openapi-types"
      ],
      "@protobufjs/fetch": [
        "@protobufjs/aspromise",
        "@protobufjs/inquire"
      ],
      "@slack/webhook": [
        "@slack/types",
        "@types/node",
        "axios"
      ],
      "@smithy/config-resolver": [
        "@smithy/node-config-provider",
        "@smithy/types",
        "@smithy/util-config-provider",
        "@smithy/util-endpoints",
        "@smithy/util-middleware",
        "tslib"
      ],
      "@smithy/core": [
        "@smithy/protocol-http",
        "@smithy/types",
        "@smithy/url-parser",
        "@smithy/util-base64",
        "@smithy/util-body-length-browser",
        "@smithy/util-middleware",
        "@smithy/util-stream",
        "@smithy/util-utf8",
        "@smithy/uuid",
        "tslib"
      ],
      "@smithy/credential-provider-imds": [
        "@smithy/node-config-provider",
        "@smithy/property-provider",
        "@smithy/types",
        "@smithy/url-parser",
        "tslib"
      ],
      "@smithy/eventstream-codec": [
        "@aws-crypto/crc32",
        "@smithy/types",
        "@smithy/util-hex-encoding",
        "tslib"
      ],
      "@smithy/eventstream-serde-browser": [
        "@smithy/eventstream-serde-universal",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/eventstream-serde-config-resolver": [
        "@smithy/types",
        "tslib"
      ],
      "@smithy/eventstream-serde-node": [
        "@smithy/eventstream-serde-universal",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/eventstream-serde-universal": [
        "@smithy/eventstream-codec",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/fetch-http-handler": [
        "@smithy/protocol-http",
        "@smithy/querystring-builder",
        "@smithy/types",
        "@smithy/util-base64",
        "tslib"
      ],
      "@smithy/hash-node": [
        "@smithy/types",
        "@smithy/util-buffer-from",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@smithy/invalid-dependency": [
        "@smithy/types",
        "tslib"
      ],
      "@smithy/is-array-buffer": [
        "tslib"
      ],
      "@smithy/middleware-content-length": [
        "@smithy/protocol-http",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/middleware-endpoint": [
        "@smithy/core",
        "@smithy/middleware-serde",
        "@smithy/node-config-provider",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "@smithy/url-parser",
        "@smithy/util-middleware",
        "tslib"
      ],
      "@smithy/middleware-retry": [
        "@smithy/core",
        "@smithy/node-config-provider",
        "@smithy/protocol-http",
        "@smithy/service-error-classification",
        "@smithy/smithy-client",
        "@smithy/types",
        "@smithy/util-middleware",
        "@smithy/util-retry",
        "@smithy/uuid",
        "tslib"
      ],
      "@smithy/middleware-serde": [
        "@smithy/core",
        "@smithy/protocol-http",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/middleware-stack": [
        "@smithy/types",
        "tslib"
      ],
      "@smithy/node-config-provider": [
        "@smithy/property-provider",
        "@smithy/shared-ini-file-loader",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/node-http-handler": [
        "@smithy/protocol-http",
        "@smithy/querystring-builder",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/property-provider": [
        "@smithy/types",
        "tslib"
      ],
      "@smithy/protocol-http": [
        "@smithy/types",
        "tslib"
      ],
      "@smithy/querystring-builder": [
        "@smithy/types",
        "@smithy/util-uri-escape",
        "tslib"
      ],
      "@smithy/querystring-parser": [
        "@smithy/types",
        "tslib"
      ],
      "@smithy/service-error-classification": [
        "@smithy/types"
      ],
      "@smithy/shared-ini-file-loader": [
        "@smithy/types",
        "tslib"
      ],
      "@smithy/signature-v4": [
        "@smithy/is-array-buffer",
        "@smithy/protocol-http",
        "@smithy/types",
        "@smithy/util-hex-encoding",
        "@smithy/util-middleware",
        "@smithy/util-uri-escape",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@smithy/smithy-client": [
        "@smithy/core",
        "@smithy/middleware-endpoint",
        "@smithy/middleware-stack",
        "@smithy/protocol-http",
        "@smithy/types",
        "@smithy/util-stream",
        "tslib"
      ],
      "@smithy/types": [
        "tslib"
      ],
      "@smithy/url-parser": [
        "@smithy/querystring-parser",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/util-base64": [
        "@smithy/util-buffer-from",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@smithy/util-body-length-browser": [
        "tslib"
      ],
      "@smithy/util-body-length-node": [
        "tslib"
      ],
      "@smithy/util-buffer-from": [
        "@smithy/is-array-buffer",
        "tslib"
      ],
      "@smithy/util-config-provider": [
        "tslib"
      ],
      "@smithy/util-defaults-mode-browser": [
        "@smithy/property-provider",
        "@smithy/smithy-client",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/util-defaults-mode-node": [
        "@smithy/config-resolver",
        "@smithy/credential-provider-imds",
        "@smithy/node-config-provider",
        "@smithy/property-provider",
        "@smithy/smithy-client",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/util-endpoints": [
        "@smithy/node-config-provider",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/util-hex-encoding": [
        "tslib"
      ],
      "@smithy/util-middleware": [
        "@smithy/types",
        "tslib"
      ],
      "@smithy/util-retry": [
        "@smithy/service-error-classification",
        "@smithy/types",
        "tslib"
      ],
      "@smithy/util-stream": [
        "@smithy/fetch-http-handler",
        "@smithy/node-http-handler",
        "@smithy/types",
        "@smithy/util-base64",
        "@smithy/util-buffer-from",
        "@smithy/util-hex-encoding",
        "@smithy/util-utf8",
        "tslib"
      ],
      "@smithy/util-uri-escape": [
        "tslib"
      ],
      "@smithy/util-utf8": [
        "@smithy/util-buffer-from",
        "tslib"
      ],
      "@smithy/uuid": [
        "tslib"
      ],
      "@tokenizer/inflate": [
        "debug",
        "token-types"
      ],
      "@types/node": [
        "undici-types"
      ],
      "@types/yauzl": [
        "@types/node"
      ],
      "accepts": [
        "mime-types",
        "negotiator"
      ],
      "ajv": [
        "fast-deep-equal",
        "fast-uri",
        "json-schema-traverse",
        "require-from-string"
      ],
      "ajv-formats": [
        "ajv"
      ],
      "ansi-styles": [
        "color-convert"
      ],
      "asn1.js": [
        "bn.js",
        "inherits",
        "minimalistic-assert",
        "safer-buffer"
      ],
      "ast-types": [
        "tslib"
      ],
      "axios": [
        "follow-redirects",
        "form-data",
        "proxy-from-env"
      ],
      "body-parser": [
        "bytes",
        "content-type",
        "debug",
        "http-errors",
        "iconv-lite",
        "on-finished",
        "qs",
        "raw-body",
        "type-is"
      ],
      "brace-expansion": [
        "balanced-match"
      ],
      "braces": [
        "fill-range"
      ],
      "call-bind-apply-helpers": [
        "es-errors",
        "function-bind"
      ],
      "call-bound": [
        "call-bind-apply-helpers",
        "get-intrinsic"
      ],
      "chalk": [
        "ansi-styles",
        "supports-color"
      ],
      "chokidar": [
        "readdirp"
      ],
      "cli-highlight": [
        "chalk",
        "highlight.js",
        "mz",
        "parse5",
        "parse5-htmlparser2-tree-adapter",
        "yargs"
      ],
      "cliui": [
        "string-width",
        "strip-ansi",
        "wrap-ansi"
      ],
      "color-convert": [
        "color-name"
      ],
      "combined-stream": [
        "delayed-stream"
      ],
      "cors": [
        "object-assign",
        "vary"
      ],
      "cross-spawn": [
        "path-key",
        "shebang-command",
        "which"
      ],
      "debug": [
        "ms"
      ],
      "define-data-property": [
        "es-define-property",
        "es-errors",
        "gopd"
      ],
      "define-properties": [
        "define-data-property",
        "has-property-descriptors",
        "object-keys"
      ],
      "degenerator": [
        "ast-types",
        "escodegen",
        "esprima"
      ],
      "dunder-proto": [
        "call-bind-apply-helpers",
        "es-errors",
        "gopd"
      ],
      "ecdsa-sig-formatter": [
        "safe-buffer"
      ],
      "end-of-stream": [
        "once"
      ],
      "es-object-atoms": [
        "es-errors"
      ],
      "es-set-tostringtag": [
        "es-errors",
        "get-intrinsic",
        "has-tostringtag",
        "hasown"
      ],
      "escodegen": [
        "esprima",
        "estraverse",
        "esutils"
      ],
      "eventsource": [
        "eventsource-parser"
      ],
      "express": [
        "accepts",
        "body-parser",
        "content-disposition",
        "content-type",
        "cookie",
        "cookie-signature",
        "debug",
        "depd",
        "encodeurl",
        "escape-html",
        "etag",
        "finalhandler",
        "fresh",
        "http-errors",
        "merge-descriptors",
        "mime-types",
        "on-finished",
        "once",
        "parseurl",
        "proxy-addr",
        "qs",
        "range-parser",
        "router",
        "send",
        "serve-static",
        "statuses",
        "type-is",
        "vary"
      ],
      "express-rate-limit": [
        "ip-address"
      ],
      "extract-zip": [
        "debug",
        "get-stream",
        "yauzl"
      ],
      "fast-glob": [
        "@nodelib/fs.stat",
        "@nodelib/fs.walk",
        "glob-parent",
        "merge2",
        "micromatch"
      ],
      "fast-string-width": [
        "fast-string-truncated-width"
      ],
      "fast-wrap-ansi": [
        "fast-string-width"
      ],
      "fast-xml-builder": [
        "path-expression-matcher"
      ],
      "fast-xml-parser": [
        "@nodable/entities",
        "fast-xml-builder",
        "path-expression-matcher",
        "strnum"
      ],
      "fastq": [
        "reusify"
      ],
      "fd-slicer": [
        "pend"
      ],
      "fetch-blob": [
        "node-domexception",
        "web-streams-polyfill"
      ],
      "file-type": [
        "@tokenizer/inflate",
        "strtok3",
        "token-types",
        "uint8array-extras"
      ],
      "fill-range": [
        "to-regex-range"
      ],
      "finalhandler": [
        "debug",
        "encodeurl",
        "escape-html",
        "on-finished",
        "parseurl",
        "statuses"
      ],
      "find-up": [
        "locate-path",
        "path-exists"
      ],
      "form-data": [
        "asynckit",
        "combined-stream",
        "es-set-tostringtag",
        "hasown",
        "mime-types"
      ],
      "formdata-polyfill": [
        "fetch-blob"
      ],
      "gaxios": [
        "extend",
        "https-proxy-agent",
        "node-fetch"
      ],
      "gcp-metadata": [
        "gaxios",
        "google-logging-utils",
        "json-bigint"
      ],
      "get-intrinsic": [
        "call-bind-apply-helpers",
        "es-define-property",
        "es-errors",
        "es-object-atoms",
        "function-bind",
        "get-proto",
        "gopd",
        "has-symbols",
        "hasown",
        "math-intrinsics"
      ],
      "get-proto": [
        "dunder-proto",
        "es-object-atoms"
      ],
      "get-stream": [
        "pump"
      ],
      "get-uri": [
        "basic-ftp",
        "data-uri-to-buffer",
        "debug"
      ],
      "glob": [
        "minimatch",
        "minipass",
        "path-scurry"
      ],
      "glob-parent": [
        "is-glob"
      ],
      "global-agent": [
        "globalthis",
        "matcher",
        "semver",
        "serialize-error"
      ],
      "globalthis": [
        "define-properties",
        "gopd"
      ],
      "google-auth-library": [
        "base64-js",
        "ecdsa-sig-formatter",
        "gaxios",
        "gcp-metadata",
        "google-logging-utils",
        "jws"
      ],
      "has-property-descriptors": [
        "es-define-property"
      ],
      "has-tostringtag": [
        "has-symbols"
      ],
      "hasown": [
        "function-bind"
      ],
      "hosted-git-info": [
        "lru-cache"
      ],
      "http-errors": [
        "depd",
        "inherits",
        "setprototypeof",
        "statuses",
        "toidentifier"
      ],
      "http-proxy-agent": [
        "agent-base",
        "debug"
      ],
      "https-proxy-agent": [
        "agent-base",
        "debug"
      ],
      "iconv-lite": [
        "safer-buffer"
      ],
      "is-glob": [
        "is-extglob"
      ],
      "json-bigint": [
        "bignumber.js"
      ],
      "json-schema-to-ts": [
        "@babel/runtime",
        "ts-algebra"
      ],
      "jszip": [
        "lie",
        "pako",
        "readable-stream",
        "setimmediate"
      ],
      "jwa": [
        "buffer-equal-constant-time",
        "ecdsa-sig-formatter",
        "safe-buffer"
      ],
      "jws": [
        "jwa",
        "safe-buffer"
      ],
      "lie": [
        "immediate"
      ],
      "linkify-it": [
        "uc.micro"
      ],
      "locate-path": [
        "p-locate"
      ],
      "markdown-it": [
        "argparse",
        "entities",
        "linkify-it",
        "mdurl",
        "punycode.js",
        "uc.micro"
      ],
      "matcher": [
        "escape-string-regexp"
      ],
      "micromatch": [
        "braces",
        "picomatch"
      ],
      "mime-types": [
        "mime-db"
      ],
      "minimatch": [
        "brace-expansion"
      ],
      "minizlib": [
        "minipass"
      ],
      "mz": [
        "any-promise",
        "object-assign",
        "thenify-all"
      ],
      "node-fetch": [
        "data-uri-to-buffer",
        "fetch-blob",
        "formdata-polyfill"
      ],
      "on-finished": [
        "ee-first"
      ],
      "once": [
        "wrappy"
      ],
      "openclaw": [
        "@agentclientprotocol/sdk",
        "@clack/prompts",
        "@lydell/node-pty",
        "@mariozechner/pi-agent-core",
        "@mariozechner/pi-ai",
        "@mariozechner/pi-coding-agent",
        "@mariozechner/pi-tui",
        "@modelcontextprotocol/sdk",
        "ajv",
        "chalk",
        "chokidar",
        "commander",
        "croner",
        "dotenv",
        "file-type",
        "global-agent",
        "https-proxy-agent",
        "ipaddr.js",
        "jiti",
        "json5",
        "jszip",
        "markdown-it",
        "openai",
        "proxy-agent",
        "qrcode",
        "semver",
        "sqlite-vec",
        "tar",
        "tslog",
        "typebox",
        "undici",
        "web-push",
        "ws",
        "yaml",
        "zod"
      ],
      "p-limit": [
        "p-try",
        "yocto-queue"
      ],
      "p-locate": [
        "p-limit"
      ],
      "p-retry": [
        "@types/retry",
        "retry"
      ],
      "pac-proxy-agent": [
        "@tootallnate/quickjs-emscripten",
        "agent-base",
        "debug",
        "get-uri",
        "http-proxy-agent",
        "https-proxy-agent",
        "pac-resolver",
        "quickjs-wasi",
        "socks-proxy-agent"
      ],
      "pac-resolver": [
        "degenerator",
        "netmask"
      ],
      "parse5-htmlparser2-tree-adapter": [
        "parse5"
      ],
      "path-scurry": [
        "lru-cache",
        "minipass"
      ],
      "proper-lockfile": [
        "graceful-fs",
        "retry",
        "signal-exit"
      ],
      "protobufjs": [
        "@protobufjs/aspromise",
        "@protobufjs/base64",
        "@protobufjs/codegen",
        "@protobufjs/eventemitter",
        "@protobufjs/fetch",
        "@protobufjs/float",
        "@protobufjs/inquire",
        "@protobufjs/path",
        "@protobufjs/pool",
        "@protobufjs/utf8",
        "@types/node",
        "long"
      ],
      "proxy-addr": [
        "forwarded",
        "ipaddr.js"
      ],
      "proxy-agent": [
        "agent-base",
        "debug",
        "http-proxy-agent",
        "https-proxy-agent",
        "lru-cache",
        "pac-proxy-agent",
        "proxy-from-env",
        "socks-proxy-agent"
      ],
      "pump": [
        "end-of-stream",
        "once"
      ],
      "qrcode": [
        "dijkstrajs",
        "pngjs",
        "yargs"
      ],
      "qs": [
        "side-channel"
      ],
      "raw-body": [
        "bytes",
        "http-errors",
        "iconv-lite",
        "unpipe"
      ],
      "readable-stream": [
        "core-util-is",
        "inherits",
        "isarray",
        "process-nextick-args",
        "safe-buffer",
        "string_decoder",
        "util-deprecate"
      ],
      "router": [
        "debug",
        "depd",
        "is-promise",
        "parseurl",
        "path-to-regexp"
      ],
      "run-parallel": [
        "queue-microtask"
      ],
      "send": [
        "debug",
        "encodeurl",
        "escape-html",
        "etag",
        "fresh",
        "http-errors",
        "mime-types",
        "ms",
        "on-finished",
        "range-parser",
        "statuses"
      ],
      "serialize-error": [
        "type-fest"
      ],
      "serve-static": [
        "encodeurl",
        "escape-html",
        "parseurl",
        "send"
      ],
      "shebang-command": [
        "shebang-regex"
      ],
      "side-channel": [
        "es-errors",
        "object-inspect",
        "side-channel-list",
        "side-channel-map",
        "side-channel-weakmap"
      ],
      "side-channel-list": [
        "es-errors",
        "object-inspect"
      ],
      "side-channel-map": [
        "call-bound",
        "es-errors",
        "get-intrinsic",
        "object-inspect"
      ],
      "side-channel-weakmap": [
        "call-bound",
        "es-errors",
        "get-intrinsic",
        "object-inspect",
        "side-channel-map"
      ],
      "socks": [
        "ip-address",
        "smart-buffer"
      ],
      "socks-proxy-agent": [
        "agent-base",
        "debug",
        "socks"
      ],
      "string_decoder": [
        "safe-buffer"
      ],
      "string-width": [
        "emoji-regex",
        "is-fullwidth-code-point",
        "strip-ansi"
      ],
      "strip-ansi": [
        "ansi-regex"
      ],
      "strtok3": [
        "@tokenizer/token"
      ],
      "supports-color": [
        "has-flag"
      ],
      "tar": [
        "@isaacs/fs-minipass",
        "chownr",
        "minipass",
        "minizlib",
        "yallist"
      ],
      "thenify": [
        "any-promise"
      ],
      "thenify-all": [
        "thenify"
      ],
      "to-regex-range": [
        "is-number"
      ],
      "token-types": [
        "@borewit/text-codec",
        "@tokenizer/token",
        "ieee754"
      ],
      "type-is": [
        "content-type",
        "media-typer",
        "mime-types"
      ],
      "web-push": [
        "asn1.js",
        "http_ece",
        "https-proxy-agent",
        "jws",
        "minimist"
      ],
      "which": [
        "isexe"
      ],
      "wrap-ansi": [
        "ansi-styles",
        "string-width",
        "strip-ansi"
      ],
      "yargs": [
        "cliui",
        "decamelize",
        "escalade",
        "find-up",
        "get-caller-file",
        "require-directory",
        "require-main-filename",
        "set-blocking",
        "string-width",
        "which-module",
        "y18n",
        "yargs-parser"
      ],
      "yargs-parser": [
        "camelcase",
        "decamelize"
      ],
      "yauzl": [
        "buffer-crc32",
        "fd-slicer"
      ]
    },
    "warnings": []
  },
  "dependencies": [
    {
      "name": "@agentclientprotocol/sdk",
      "versionRange": "0.21.0",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @agentclientprotocol/sdk was rate-limited or failed after retries: Request failed with status code 404",
        "GITHUB_TOKEN is not configured; GitHub Advisory Database results were skipped."
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-28T08:54:27.212Z",
        "daysSinceMaintained": 4,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@anthropic-ai/sdk",
      "versionRange": "^0.54.0",
      "direct": true,
      "advisories": [],
      "warnings": [
        "NVD query for @anthropic-ai/sdk was rate-limited or failed after retries: Request failed with status code 404",
        "GITHUB_TOKEN is not configured; GitHub Advisory Database results were skipped."
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 1,
        "files": [
          "src/git-archaeologist/module-passport.mjs"
        ],
        "normalized": 1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-30T19:42:47.218Z",
        "daysSinceMaintained": 1,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@aws-crypto/crc32",
      "versionRange": "5.2.0",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @aws-crypto/crc32 was rate-limited or failed after retries: Request failed with status code 404",
        "GITHUB_TOKEN is not configured; GitHub Advisory Database results were skipped."
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2025-05-22T20:13:30.673Z",
        "daysSinceMaintained": 344,
        "normalized": 0.9425,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@aws-crypto/sha256-browser",
      "versionRange": "5.2.0",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @aws-crypto/sha256-browser was rate-limited or failed after retries: Request failed with status code 404",
        "GITHUB_TOKEN is not configured; GitHub Advisory Database results were skipped."
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2025-05-22T20:13:58.287Z",
        "daysSinceMaintained": 344,
        "normalized": 0.9425,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@aws-crypto/sha256-js",
      "versionRange": "5.2.0",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @aws-crypto/sha256-js was rate-limited or failed after retries: Request failed with status code 404",
        "GITHUB_TOKEN is not configured; GitHub Advisory Database results were skipped."
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2025-05-22T20:13:43.380Z",
        "daysSinceMaintained": 344,
        "normalized": 0.9425,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    }
  ],
  "alerts": {
    "criticalThreshold": 7,
    "criticalDependencies": [],
    "deliveries": []
  }
}
```
