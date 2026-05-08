# Dependency Ledger

Tracked dependency risk data for zx.

```json
{
  "repo": "zx",
  "updatedAt": "2026-05-08T15:36:33.750Z",
  "source": {
    "input": "https://github.com/google/zx",
    "sourceType": "git-url",
    "resolvedRepoPath": "/tmp/codesentinel-cve-huDh4M"
  },
  "manifest": {
    "ecosystem": "npm",
    "path": "/tmp/codesentinel-cve-huDh4M/package.json"
  },
  "scanScope": "all",
  "maxDependencies": 25,
  "directDependencyCount": 43,
  "graph": {
    "nodes": [
      {
        "name": "@algolia/abtesting",
        "version": "1.12.2",
        "direct": false
      },
      {
        "name": "@algolia/autocomplete-core",
        "version": "1.17.7",
        "direct": false
      },
      {
        "name": "@algolia/autocomplete-plugin-algolia-insights",
        "version": "1.17.7",
        "direct": false
      },
      {
        "name": "@algolia/autocomplete-preset-algolia",
        "version": "1.17.7",
        "direct": false
      },
      {
        "name": "@algolia/autocomplete-shared",
        "version": "1.17.7",
        "direct": false
      },
      {
        "name": "@algolia/client-abtesting",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/client-analytics",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/client-common",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/client-insights",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/client-personalization",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/client-query-suggestions",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/client-search",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/ingestion",
        "version": "1.46.2",
        "direct": false
      },
      {
        "name": "@algolia/monitoring",
        "version": "1.46.2",
        "direct": false
      },
      {
        "name": "@algolia/recommend",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/requester-browser-xhr",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/requester-fetch",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@algolia/requester-node-http",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "@assemblyscript/loader",
        "version": "0.19.23",
        "direct": false
      },
      {
        "name": "@babel/code-frame",
        "version": "7.27.1",
        "direct": false
      },
      {
        "name": "@babel/helper-string-parser",
        "version": "7.27.1",
        "direct": false
      },
      {
        "name": "@babel/helper-validator-identifier",
        "version": "7.28.5",
        "direct": false
      },
      {
        "name": "@babel/parser",
        "version": "7.28.5",
        "direct": false
      },
      {
        "name": "@babel/types",
        "version": "7.28.5",
        "direct": false
      },
      {
        "name": "@bcoe/v8-coverage",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "@commitlint/cli",
        "version": "^20.5.0",
        "direct": true
      },
      {
        "name": "@commitlint/config-conventional",
        "version": "^20.5.0",
        "direct": true
      },
      {
        "name": "@commitlint/config-validator",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/ensure",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/execute-rule",
        "version": "20.0.0",
        "direct": false
      },
      {
        "name": "@commitlint/format",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/is-ignored",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/lint",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/load",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/message",
        "version": "20.4.3",
        "direct": false
      },
      {
        "name": "@commitlint/parse",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/read",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/resolve-extends",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/rules",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@commitlint/to-lines",
        "version": "20.0.0",
        "direct": false
      },
      {
        "name": "@commitlint/top-level",
        "version": "20.4.3",
        "direct": false
      },
      {
        "name": "@commitlint/types",
        "version": "20.5.0",
        "direct": false
      },
      {
        "name": "@conventional-changelog/git-client",
        "version": "2.6.0",
        "direct": false
      },
      {
        "name": "@cspotcode/source-map-support",
        "version": "0.8.1",
        "direct": false
      },
      {
        "name": "@dependents/detective-less",
        "version": "5.0.1",
        "direct": false
      },
      {
        "name": "@docsearch/css",
        "version": "3.8.2",
        "direct": false
      },
      {
        "name": "@docsearch/js",
        "version": "3.8.2",
        "direct": false
      },
      {
        "name": "@docsearch/react",
        "version": "3.8.2",
        "direct": false
      },
      {
        "name": "@esbuild/aix-ppc64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/android-arm",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/android-arm64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/android-x64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/darwin-arm64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/darwin-x64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/freebsd-arm64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/freebsd-x64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-arm",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-arm64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-ia32",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-loong64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-mips64el",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-ppc64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-riscv64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-s390x",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/linux-x64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/netbsd-arm64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/netbsd-x64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/openbsd-arm64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/openbsd-x64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/openharmony-arm64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/sunos-x64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/win32-arm64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/win32-ia32",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@esbuild/win32-x64",
        "version": "0.28.0",
        "direct": false
      },
      {
        "name": "@iconify-json/simple-icons",
        "version": "1.2.65",
        "direct": false
      },
      {
        "name": "@iconify/types",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "@istanbuljs/schema",
        "version": "0.1.3",
        "direct": false
      },
      {
        "name": "@jest/schemas",
        "version": "29.6.3",
        "direct": false
      },
      {
        "name": "@jridgewell/resolve-uri",
        "version": "3.1.2",
        "direct": false
      },
      {
        "name": "@jridgewell/sourcemap-codec",
        "version": "1.5.5",
        "direct": false
      },
      {
        "name": "@jridgewell/trace-mapping",
        "version": "0.3.9",
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
        "name": "@rollup/rollup-android-arm-eabi",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-android-arm64",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-darwin-arm64",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-darwin-x64",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-freebsd-arm64",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-freebsd-x64",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-arm-gnueabihf",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-arm-musleabihf",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-arm64-gnu",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-arm64-musl",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-loong64-gnu",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-loong64-musl",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-ppc64-gnu",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-ppc64-musl",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-riscv64-gnu",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-riscv64-musl",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-s390x-gnu",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-x64-gnu",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-linux-x64-musl",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-openbsd-x64",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-openharmony-arm64",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-win32-arm64-msvc",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-win32-ia32-msvc",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-win32-x64-gnu",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@rollup/rollup-win32-x64-msvc",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "@shikijs/core",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "@shikijs/engine-javascript",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "@shikijs/engine-oniguruma",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "@shikijs/langs",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "@shikijs/themes",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "@shikijs/transformers",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "@shikijs/types",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "@shikijs/vscode-textmate",
        "version": "10.0.2",
        "direct": false
      },
      {
        "name": "@simple-libs/child-process-utils",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "@simple-libs/stream-utils",
        "version": "1.2.0",
        "direct": false
      },
      {
        "name": "@sinclair/typebox",
        "version": "0.27.8",
        "direct": false
      },
      {
        "name": "@sindresorhus/merge-streams",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "@size-limit/file",
        "version": "12.1.0",
        "direct": true
      },
      {
        "name": "@ts-graphviz/adapter",
        "version": "2.0.6",
        "direct": false
      },
      {
        "name": "@ts-graphviz/ast",
        "version": "2.0.7",
        "direct": false
      },
      {
        "name": "@ts-graphviz/common",
        "version": "2.1.5",
        "direct": false
      },
      {
        "name": "@ts-graphviz/core",
        "version": "2.0.7",
        "direct": false
      },
      {
        "name": "@tsconfig/node10",
        "version": "1.0.12",
        "direct": false
      },
      {
        "name": "@tsconfig/node12",
        "version": "1.0.11",
        "direct": false
      },
      {
        "name": "@tsconfig/node14",
        "version": "1.0.3",
        "direct": false
      },
      {
        "name": "@tsconfig/node16",
        "version": "1.0.4",
        "direct": false
      },
      {
        "name": "@tsd/typescript",
        "version": "5.9.3",
        "direct": false
      },
      {
        "name": "@types/eslint",
        "version": "7.29.0",
        "direct": false
      },
      {
        "name": "@types/estree",
        "version": "1.0.8",
        "direct": false
      },
      {
        "name": "@types/fs-extra",
        "version": "11.0.4",
        "direct": true
      },
      {
        "name": "@types/hast",
        "version": "3.0.4",
        "direct": false
      },
      {
        "name": "@types/istanbul-lib-coverage",
        "version": "2.0.6",
        "direct": false
      },
      {
        "name": "@types/json-schema",
        "version": "7.0.15",
        "direct": false
      },
      {
        "name": "@types/jsonfile",
        "version": "6.1.4",
        "direct": false
      },
      {
        "name": "@types/linkify-it",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "@types/markdown-it",
        "version": "14.1.2",
        "direct": false
      },
      {
        "name": "@types/mdast",
        "version": "4.0.4",
        "direct": false
      },
      {
        "name": "@types/mdurl",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "@types/minimist",
        "version": "1.2.5",
        "direct": true
      },
      {
        "name": "@types/node",
        "version": "25.6.0",
        "direct": true
      },
      {
        "name": "@types/normalize-package-data",
        "version": "2.4.4",
        "direct": false
      },
      {
        "name": "@types/unist",
        "version": "3.0.3",
        "direct": false
      },
      {
        "name": "@types/web-bluetooth",
        "version": "0.0.21",
        "direct": false
      },
      {
        "name": "@types/which",
        "version": "3.0.4",
        "direct": true
      },
      {
        "name": "@typescript-eslint/project-service",
        "version": "8.56.1",
        "direct": false
      },
      {
        "name": "@typescript-eslint/tsconfig-utils",
        "version": "8.56.1",
        "direct": false
      },
      {
        "name": "@typescript-eslint/types",
        "version": "8.56.1",
        "direct": false
      },
      {
        "name": "@typescript-eslint/typescript-estree",
        "version": "8.56.1",
        "direct": false
      },
      {
        "name": "@typescript-eslint/visitor-keys",
        "version": "8.56.1",
        "direct": false
      },
      {
        "name": "@ungap/structured-clone",
        "version": "1.3.0",
        "direct": false
      },
      {
        "name": "@vitejs/plugin-vue",
        "version": "5.2.4",
        "direct": false
      },
      {
        "name": "@vue/compiler-core",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vue/compiler-dom",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vue/compiler-sfc",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vue/compiler-ssr",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vue/devtools-api",
        "version": "7.7.9",
        "direct": false
      },
      {
        "name": "@vue/devtools-kit",
        "version": "7.7.9",
        "direct": false
      },
      {
        "name": "@vue/devtools-shared",
        "version": "7.7.9",
        "direct": false
      },
      {
        "name": "@vue/reactivity",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vue/runtime-core",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vue/runtime-dom",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vue/server-renderer",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vue/shared",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "@vueuse/core",
        "version": "12.8.2",
        "direct": false
      },
      {
        "name": "@vueuse/integrations",
        "version": "12.8.2",
        "direct": false
      },
      {
        "name": "@vueuse/metadata",
        "version": "12.8.2",
        "direct": false
      },
      {
        "name": "@vueuse/shared",
        "version": "12.8.2",
        "direct": false
      },
      {
        "name": "@webpod/ingrid",
        "version": "1.1.1",
        "direct": true
      },
      {
        "name": "@webpod/ps",
        "version": "1.2.1",
        "direct": true
      },
      {
        "name": "acorn",
        "version": "8.15.0",
        "direct": false
      },
      {
        "name": "acorn-walk",
        "version": "8.3.4",
        "direct": false
      },
      {
        "name": "acquerello",
        "version": "4.0.3",
        "direct": false
      },
      {
        "name": "ajv",
        "version": "8.18.0",
        "direct": false
      },
      {
        "name": "algoliasearch",
        "version": "5.46.2",
        "direct": false
      },
      {
        "name": "ansi-escapes",
        "version": "4.3.2",
        "direct": false
      },
      {
        "name": "ansi-regex",
        "version": "5.0.1",
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
        "name": "app-module-path",
        "version": "2.2.0",
        "direct": false
      },
      {
        "name": "arg",
        "version": "4.1.3",
        "direct": false
      },
      {
        "name": "argparse",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "array-ify",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "array-union",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "arrify",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "ast-module-types",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "astral-regex",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "balanced-match",
        "version": "4.0.3",
        "direct": false
      },
      {
        "name": "base64-js",
        "version": "1.5.1",
        "direct": false
      },
      {
        "name": "birpc",
        "version": "2.9.0",
        "direct": false
      },
      {
        "name": "bl",
        "version": "4.1.0",
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
        "name": "buffer",
        "version": "5.7.1",
        "direct": false
      },
      {
        "name": "bytes-iec",
        "version": "3.1.1",
        "direct": false
      },
      {
        "name": "c8",
        "version": "11.0.0",
        "direct": true
      },
      {
        "name": "callsites",
        "version": "3.1.0",
        "direct": false
      },
      {
        "name": "camelcase",
        "version": "5.3.1",
        "direct": false
      },
      {
        "name": "camelcase-keys",
        "version": "6.2.2",
        "direct": false
      },
      {
        "name": "ccount",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "chalk",
        "version": "5.6.2",
        "direct": true
      },
      {
        "name": "character-entities-html4",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "character-entities-legacy",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "cli-cursor",
        "version": "3.1.0",
        "direct": false
      },
      {
        "name": "cli-spinners",
        "version": "2.9.2",
        "direct": false
      },
      {
        "name": "cliui",
        "version": "8.0.1",
        "direct": false
      },
      {
        "name": "clone",
        "version": "1.0.4",
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
        "name": "comma-separated-tokens",
        "version": "2.0.3",
        "direct": false
      },
      {
        "name": "commander",
        "version": "7.2.0",
        "direct": false
      },
      {
        "name": "commondir",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "compare-func",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "conventional-changelog-angular",
        "version": "8.3.0",
        "direct": false
      },
      {
        "name": "conventional-changelog-conventionalcommits",
        "version": "9.3.0",
        "direct": false
      },
      {
        "name": "conventional-commits-parser",
        "version": "6.3.0",
        "direct": false
      },
      {
        "name": "convert-source-map",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "copy-anything",
        "version": "4.0.5",
        "direct": false
      },
      {
        "name": "cosmiconfig",
        "version": "9.0.1",
        "direct": false
      },
      {
        "name": "cosmiconfig-typescript-loader",
        "version": "6.2.0",
        "direct": false
      },
      {
        "name": "create-require",
        "version": "1.1.1",
        "direct": true
      },
      {
        "name": "cronometro",
        "version": "6.0.3",
        "direct": true
      },
      {
        "name": "cross-spawn",
        "version": "7.0.6",
        "direct": false
      },
      {
        "name": "csstype",
        "version": "3.2.3",
        "direct": false
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
        "name": "decamelize-keys",
        "version": "1.1.1",
        "direct": false
      },
      {
        "name": "deep-extend",
        "version": "0.6.0",
        "direct": false
      },
      {
        "name": "defaults",
        "version": "1.0.4",
        "direct": false
      },
      {
        "name": "dependency-tree",
        "version": "11.3.0",
        "direct": false
      },
      {
        "name": "depseek",
        "version": "0.4.3",
        "direct": true
      },
      {
        "name": "dequal",
        "version": "2.0.3",
        "direct": false
      },
      {
        "name": "detective-amd",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "detective-cjs",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "detective-es6",
        "version": "5.0.1",
        "direct": false
      },
      {
        "name": "detective-postcss",
        "version": "7.0.1",
        "direct": false
      },
      {
        "name": "detective-sass",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "detective-scss",
        "version": "5.0.1",
        "direct": false
      },
      {
        "name": "detective-stylus",
        "version": "5.0.1",
        "direct": false
      },
      {
        "name": "detective-typescript",
        "version": "14.0.0",
        "direct": false
      },
      {
        "name": "detective-vue2",
        "version": "2.2.0",
        "direct": false
      },
      {
        "name": "devlop",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "diff",
        "version": "4.0.4",
        "direct": false
      },
      {
        "name": "diff-sequences",
        "version": "29.6.3",
        "direct": false
      },
      {
        "name": "dir-glob",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "dot-prop",
        "version": "5.3.0",
        "direct": false
      },
      {
        "name": "dts-bundle-generator",
        "version": "9.5.1",
        "direct": true
      },
      {
        "name": "emoji-regex",
        "version": "8.0.0",
        "direct": false
      },
      {
        "name": "emoji-regex-xs",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "empathic",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "enhanced-resolve",
        "version": "5.19.0",
        "direct": false
      },
      {
        "name": "entities",
        "version": "7.0.0",
        "direct": false
      },
      {
        "name": "env-paths",
        "version": "2.2.1",
        "direct": false
      },
      {
        "name": "envapi",
        "version": "0.2.3",
        "direct": true
      },
      {
        "name": "error-ex",
        "version": "1.3.4",
        "direct": false
      },
      {
        "name": "esbuild",
        "version": "0.28.0",
        "direct": true
      },
      {
        "name": "esbuild-node-externals",
        "version": "1.22.0",
        "direct": true
      },
      {
        "name": "esbuild-plugin-entry-chunks",
        "version": "0.1.17",
        "direct": true
      },
      {
        "name": "esbuild-plugin-extract-helpers",
        "version": "0.0.6",
        "direct": true
      },
      {
        "name": "esbuild-plugin-hybrid-export",
        "version": "0.3.1",
        "direct": true
      },
      {
        "name": "esbuild-plugin-resolve",
        "version": "2.0.0",
        "direct": true
      },
      {
        "name": "esbuild-plugin-transform-hook",
        "version": "0.2.0",
        "direct": true
      },
      {
        "name": "esbuild-plugin-utils",
        "version": "0.1.0",
        "direct": true
      },
      {
        "name": "escalade",
        "version": "3.2.0",
        "direct": false
      },
      {
        "name": "escodegen",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "eslint-formatter-pretty",
        "version": "4.1.0",
        "direct": false
      },
      {
        "name": "eslint-rule-docs",
        "version": "1.1.235",
        "direct": false
      },
      {
        "name": "eslint-visitor-keys",
        "version": "5.0.1",
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
        "name": "estree-walker",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "esutils",
        "version": "2.0.3",
        "direct": false
      },
      {
        "name": "fast-deep-equal",
        "version": "3.1.3",
        "direct": false
      },
      {
        "name": "fast-glob",
        "version": "3.3.3",
        "direct": false
      },
      {
        "name": "fast-uri",
        "version": "3.1.0",
        "direct": false
      },
      {
        "name": "fastq",
        "version": "1.20.1",
        "direct": false
      },
      {
        "name": "fdir",
        "version": "6.5.0",
        "direct": false
      },
      {
        "name": "filing-cabinet",
        "version": "5.1.0",
        "direct": false
      },
      {
        "name": "fill-range",
        "version": "7.1.1",
        "direct": false
      },
      {
        "name": "find-up",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "focus-trap",
        "version": "7.7.1",
        "direct": false
      },
      {
        "name": "foreground-child",
        "version": "3.3.1",
        "direct": false
      },
      {
        "name": "fs-extra",
        "version": "11.3.4",
        "direct": true
      },
      {
        "name": "fsevents",
        "version": "2.3.3",
        "direct": false
      },
      {
        "name": "function-bind",
        "version": "1.1.2",
        "direct": false
      },
      {
        "name": "get-amd-module-type",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "get-caller-file",
        "version": "2.0.5",
        "direct": false
      },
      {
        "name": "get-own-enumerable-property-symbols",
        "version": "3.0.2",
        "direct": false
      },
      {
        "name": "get-port",
        "version": "7.2.0",
        "direct": true
      },
      {
        "name": "get-tsconfig",
        "version": "4.13.0",
        "direct": false
      },
      {
        "name": "git-raw-commits",
        "version": "5.0.1",
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
        "name": "global-directory",
        "version": "4.0.1",
        "direct": false
      },
      {
        "name": "globby",
        "version": "16.1.1",
        "direct": true
      },
      {
        "name": "gonzales-pe",
        "version": "4.3.0",
        "direct": false
      },
      {
        "name": "graceful-fs",
        "version": "4.2.11",
        "direct": false
      },
      {
        "name": "hard-rejection",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "has-flag",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "hasown",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "hast-util-to-html",
        "version": "9.0.5",
        "direct": false
      },
      {
        "name": "hast-util-whitespace",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "hdr-histogram-js",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "hookable",
        "version": "5.5.3",
        "direct": false
      },
      {
        "name": "hosted-git-info",
        "version": "2.8.9",
        "direct": false
      },
      {
        "name": "html-escaper",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "html-void-elements",
        "version": "3.0.0",
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
        "name": "import-fresh",
        "version": "3.3.1",
        "direct": false
      },
      {
        "name": "import-meta-resolve",
        "version": "4.2.0",
        "direct": false
      },
      {
        "name": "indent-string",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "inherits",
        "version": "2.0.4",
        "direct": false
      },
      {
        "name": "ini",
        "version": "4.1.1",
        "direct": false
      },
      {
        "name": "irregular-plurals",
        "version": "3.5.0",
        "direct": false
      },
      {
        "name": "is-arrayish",
        "version": "0.2.1",
        "direct": false
      },
      {
        "name": "is-core-module",
        "version": "2.16.1",
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
        "name": "is-interactive",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "is-number",
        "version": "7.0.0",
        "direct": false
      },
      {
        "name": "is-obj",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "is-path-inside",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "is-plain-obj",
        "version": "4.1.0",
        "direct": false
      },
      {
        "name": "is-regexp",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "is-unicode-supported",
        "version": "0.1.0",
        "direct": false
      },
      {
        "name": "is-url",
        "version": "1.2.4",
        "direct": false
      },
      {
        "name": "is-url-superb",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "is-what",
        "version": "5.5.0",
        "direct": false
      },
      {
        "name": "isexe",
        "version": "2.0.0",
        "direct": false
      },
      {
        "name": "istanbul-lib-coverage",
        "version": "3.2.2",
        "direct": false
      },
      {
        "name": "istanbul-lib-report",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "istanbul-reports",
        "version": "3.2.0",
        "direct": false
      },
      {
        "name": "jest-diff",
        "version": "29.7.0",
        "direct": false
      },
      {
        "name": "jest-get-type",
        "version": "29.6.3",
        "direct": false
      },
      {
        "name": "jiti",
        "version": "2.6.1",
        "direct": false
      },
      {
        "name": "js-tokens",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "js-yaml",
        "version": "4.1.1",
        "direct": false
      },
      {
        "name": "json-parse-even-better-errors",
        "version": "2.3.1",
        "direct": false
      },
      {
        "name": "json-schema-traverse",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "json5",
        "version": "2.2.3",
        "direct": false
      },
      {
        "name": "jsonfile",
        "version": "6.2.0",
        "direct": false
      },
      {
        "name": "jsr",
        "version": "0.14.3",
        "direct": true
      },
      {
        "name": "kind-of",
        "version": "6.0.3",
        "direct": false
      },
      {
        "name": "lefthook",
        "version": "2.1.6",
        "direct": true
      },
      {
        "name": "lefthook-darwin-arm64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-darwin-x64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-freebsd-arm64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-freebsd-x64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-linux-arm64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-linux-x64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-openbsd-arm64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-openbsd-x64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-windows-arm64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lefthook-windows-x64",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "lilconfig",
        "version": "3.1.3",
        "direct": false
      },
      {
        "name": "lines-and-columns",
        "version": "1.2.4",
        "direct": false
      },
      {
        "name": "locate-path",
        "version": "6.0.0",
        "direct": false
      },
      {
        "name": "lodash.camelcase",
        "version": "4.3.0",
        "direct": false
      },
      {
        "name": "lodash.kebabcase",
        "version": "4.1.1",
        "direct": false
      },
      {
        "name": "lodash.mergewith",
        "version": "4.6.2",
        "direct": false
      },
      {
        "name": "lodash.snakecase",
        "version": "4.1.1",
        "direct": false
      },
      {
        "name": "lodash.startcase",
        "version": "4.4.0",
        "direct": false
      },
      {
        "name": "lodash.truncate",
        "version": "4.4.2",
        "direct": false
      },
      {
        "name": "lodash.upperfirst",
        "version": "4.3.1",
        "direct": false
      },
      {
        "name": "log-symbols",
        "version": "4.1.0",
        "direct": false
      },
      {
        "name": "lru-cache",
        "version": "11.2.6",
        "direct": false
      },
      {
        "name": "madge",
        "version": "8.0.0",
        "direct": true
      },
      {
        "name": "magic-string",
        "version": "0.30.21",
        "direct": false
      },
      {
        "name": "make-dir",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "make-error",
        "version": "1.3.6",
        "direct": false
      },
      {
        "name": "maml",
        "version": "^1.0.0",
        "direct": true
      },
      {
        "name": "map-obj",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "mark.js",
        "version": "8.11.1",
        "direct": false
      },
      {
        "name": "mdast-util-to-hast",
        "version": "13.2.1",
        "direct": false
      },
      {
        "name": "meow",
        "version": "13.2.0",
        "direct": false
      },
      {
        "name": "merge2",
        "version": "1.4.1",
        "direct": false
      },
      {
        "name": "micromark-util-character",
        "version": "2.1.1",
        "direct": false
      },
      {
        "name": "micromark-util-encode",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "micromark-util-sanitize-uri",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "micromark-util-symbol",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "micromark-util-types",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "micromatch",
        "version": "4.0.8",
        "direct": false
      },
      {
        "name": "mimic-fn",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "min-indent",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "minimatch",
        "version": "10.2.4",
        "direct": false
      },
      {
        "name": "minimist",
        "version": "1.2.8",
        "direct": true
      },
      {
        "name": "minimist-options",
        "version": "4.1.0",
        "direct": false
      },
      {
        "name": "minipass",
        "version": "7.1.3",
        "direct": false
      },
      {
        "name": "minisearch",
        "version": "7.2.0",
        "direct": false
      },
      {
        "name": "mitt",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "module-definition",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "module-lookup-amd",
        "version": "9.1.0",
        "direct": false
      },
      {
        "name": "ms",
        "version": "2.1.3",
        "direct": false
      },
      {
        "name": "nanoid",
        "version": "3.3.11",
        "direct": false
      },
      {
        "name": "nanospinner",
        "version": "1.2.2",
        "direct": false
      },
      {
        "name": "node-fetch-native",
        "version": "1.6.7",
        "direct": true
      },
      {
        "name": "node-source-walk",
        "version": "7.0.1",
        "direct": false
      },
      {
        "name": "node-stream-zip",
        "version": "1.15.0",
        "direct": false
      },
      {
        "name": "normalize-package-data",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "onetime",
        "version": "5.1.2",
        "direct": false
      },
      {
        "name": "oniguruma-to-es",
        "version": "3.1.1",
        "direct": false
      },
      {
        "name": "ora",
        "version": "5.4.1",
        "direct": false
      },
      {
        "name": "p-limit",
        "version": "3.1.0",
        "direct": false
      },
      {
        "name": "p-locate",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "p-try",
        "version": "2.2.0",
        "direct": false
      },
      {
        "name": "pako",
        "version": "1.0.11",
        "direct": false
      },
      {
        "name": "parent-module",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "parse-json",
        "version": "5.2.0",
        "direct": false
      },
      {
        "name": "parse-ms",
        "version": "2.1.0",
        "direct": false
      },
      {
        "name": "path-exists",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "path-key",
        "version": "3.1.1",
        "direct": false
      },
      {
        "name": "path-parse",
        "version": "1.0.7",
        "direct": false
      },
      {
        "name": "path-scurry",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "path-type",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "perfect-debounce",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "picocolors",
        "version": "1.1.1",
        "direct": false
      },
      {
        "name": "picomatch",
        "version": "2.3.2",
        "direct": false
      },
      {
        "name": "plur",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "pluralize",
        "version": "8.0.0",
        "direct": false
      },
      {
        "name": "postcss",
        "version": "8.5.6",
        "direct": false
      },
      {
        "name": "postcss-values-parser",
        "version": "6.0.2",
        "direct": false
      },
      {
        "name": "preact",
        "version": "10.28.2",
        "direct": false
      },
      {
        "name": "precinct",
        "version": "12.2.0",
        "direct": false
      },
      {
        "name": "prettier",
        "version": "3.8.3",
        "direct": true
      },
      {
        "name": "pretty-format",
        "version": "29.7.0",
        "direct": false
      },
      {
        "name": "pretty-ms",
        "version": "7.0.1",
        "direct": false
      },
      {
        "name": "property-information",
        "version": "7.1.0",
        "direct": false
      },
      {
        "name": "queue-microtask",
        "version": "1.2.3",
        "direct": false
      },
      {
        "name": "quick-lru",
        "version": "4.0.1",
        "direct": false
      },
      {
        "name": "quote-unquote",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "rc",
        "version": "1.2.8",
        "direct": false
      },
      {
        "name": "react-is",
        "version": "18.3.1",
        "direct": false
      },
      {
        "name": "read-pkg",
        "version": "5.2.0",
        "direct": false
      },
      {
        "name": "read-pkg-up",
        "version": "7.0.1",
        "direct": false
      },
      {
        "name": "readable-stream",
        "version": "3.6.2",
        "direct": false
      },
      {
        "name": "redent",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "regex",
        "version": "6.1.0",
        "direct": false
      },
      {
        "name": "regex-recursion",
        "version": "6.0.2",
        "direct": false
      },
      {
        "name": "regex-utilities",
        "version": "2.3.0",
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
        "name": "requirejs",
        "version": "2.3.8",
        "direct": false
      },
      {
        "name": "requirejs-config-file",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "resolve",
        "version": "1.22.11",
        "direct": false
      },
      {
        "name": "resolve-dependency-path",
        "version": "4.0.1",
        "direct": false
      },
      {
        "name": "resolve-from",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "resolve-pkg-maps",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "restore-cursor",
        "version": "3.1.0",
        "direct": false
      },
      {
        "name": "reusify",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "rfdc",
        "version": "1.4.1",
        "direct": false
      },
      {
        "name": "rollup",
        "version": "4.59.0",
        "direct": false
      },
      {
        "name": "run-parallel",
        "version": "1.2.0",
        "direct": false
      },
      {
        "name": "safe-buffer",
        "version": "5.2.1",
        "direct": false
      },
      {
        "name": "sass-lookup",
        "version": "6.1.0",
        "direct": false
      },
      {
        "name": "search-insights",
        "version": "2.17.3",
        "direct": false
      },
      {
        "name": "semiver",
        "version": "1.1.0",
        "direct": false
      },
      {
        "name": "semver",
        "version": "5.7.2",
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
        "name": "shiki",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "signal-exit",
        "version": "3.0.7",
        "direct": false
      },
      {
        "name": "size-limit",
        "version": "12.1.0",
        "direct": true
      },
      {
        "name": "slash",
        "version": "5.1.0",
        "direct": false
      },
      {
        "name": "slice-ansi",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "source-map",
        "version": "0.6.1",
        "direct": false
      },
      {
        "name": "source-map-js",
        "version": "1.2.1",
        "direct": false
      },
      {
        "name": "space-separated-tokens",
        "version": "2.0.2",
        "direct": false
      },
      {
        "name": "spdx-correct",
        "version": "3.2.0",
        "direct": false
      },
      {
        "name": "spdx-exceptions",
        "version": "2.5.0",
        "direct": false
      },
      {
        "name": "spdx-expression-parse",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "spdx-license-ids",
        "version": "3.0.22",
        "direct": false
      },
      {
        "name": "speakingurl",
        "version": "14.0.1",
        "direct": false
      },
      {
        "name": "stream-to-array",
        "version": "2.3.0",
        "direct": false
      },
      {
        "name": "string_decoder",
        "version": "1.3.0",
        "direct": false
      },
      {
        "name": "string-width",
        "version": "4.2.3",
        "direct": false
      },
      {
        "name": "stringify-entities",
        "version": "4.0.4",
        "direct": false
      },
      {
        "name": "stringify-object",
        "version": "3.3.0",
        "direct": false
      },
      {
        "name": "strip-ansi",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "strip-bom",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "strip-indent",
        "version": "3.0.0",
        "direct": false
      },
      {
        "name": "strip-json-comments",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "stylus-lookup",
        "version": "6.1.0",
        "direct": false
      },
      {
        "name": "superjson",
        "version": "2.2.6",
        "direct": false
      },
      {
        "name": "supports-color",
        "version": "7.2.0",
        "direct": false
      },
      {
        "name": "supports-hyperlinks",
        "version": "2.3.0",
        "direct": false
      },
      {
        "name": "supports-preserve-symlinks-flag",
        "version": "1.0.0",
        "direct": false
      },
      {
        "name": "tabbable",
        "version": "6.4.0",
        "direct": false
      },
      {
        "name": "table",
        "version": "6.9.0",
        "direct": false
      },
      {
        "name": "tapable",
        "version": "2.3.0",
        "direct": false
      },
      {
        "name": "test-exclude",
        "version": "8.0.0",
        "direct": false
      },
      {
        "name": "tinyexec",
        "version": "1.0.4",
        "direct": false
      },
      {
        "name": "tinyglobby",
        "version": "0.2.16",
        "direct": false
      },
      {
        "name": "to-regex-range",
        "version": "5.0.1",
        "direct": false
      },
      {
        "name": "trim-lines",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "trim-newlines",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "ts-api-utils",
        "version": "2.4.0",
        "direct": false
      },
      {
        "name": "ts-graphviz",
        "version": "2.1.6",
        "direct": false
      },
      {
        "name": "ts-node",
        "version": "10.9.2",
        "direct": true
      },
      {
        "name": "tsconfig-paths",
        "version": "4.2.0",
        "direct": false
      },
      {
        "name": "tsd",
        "version": "0.33.0",
        "direct": true
      },
      {
        "name": "tsx",
        "version": "4.21.0",
        "direct": true
      },
      {
        "name": "type-fest",
        "version": "0.8.1",
        "direct": false
      },
      {
        "name": "typescript",
        "version": "5.9.3",
        "direct": true
      },
      {
        "name": "undici-types",
        "version": "7.19.2",
        "direct": false
      },
      {
        "name": "unicorn-magic",
        "version": "0.4.0",
        "direct": false
      },
      {
        "name": "unist-util-is",
        "version": "6.0.1",
        "direct": false
      },
      {
        "name": "unist-util-position",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "unist-util-stringify-position",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "unist-util-visit",
        "version": "5.0.0",
        "direct": false
      },
      {
        "name": "unist-util-visit-parents",
        "version": "6.0.2",
        "direct": false
      },
      {
        "name": "universalify",
        "version": "2.0.1",
        "direct": false
      },
      {
        "name": "util-deprecate",
        "version": "1.0.2",
        "direct": false
      },
      {
        "name": "v8-compile-cache-lib",
        "version": "3.0.1",
        "direct": false
      },
      {
        "name": "v8-to-istanbul",
        "version": "9.3.0",
        "direct": false
      },
      {
        "name": "validate-npm-package-license",
        "version": "3.0.4",
        "direct": false
      },
      {
        "name": "vfile",
        "version": "6.0.3",
        "direct": false
      },
      {
        "name": "vfile-message",
        "version": "4.0.3",
        "direct": false
      },
      {
        "name": "vite",
        "version": "5.4.21",
        "direct": false
      },
      {
        "name": "vitepress",
        "version": "1.6.4",
        "direct": true
      },
      {
        "name": "vue",
        "version": "3.5.26",
        "direct": false
      },
      {
        "name": "walkdir",
        "version": "0.4.1",
        "direct": false
      },
      {
        "name": "wcwidth",
        "version": "1.0.1",
        "direct": false
      },
      {
        "name": "which",
        "version": "6.0.1",
        "direct": true
      },
      {
        "name": "wrap-ansi",
        "version": "7.0.0",
        "direct": false
      },
      {
        "name": "y18n",
        "version": "5.0.8",
        "direct": false
      },
      {
        "name": "yallist",
        "version": "4.0.0",
        "direct": false
      },
      {
        "name": "yaml",
        "version": "2.8.3",
        "direct": true
      },
      {
        "name": "yargs",
        "version": "17.7.2",
        "direct": false
      },
      {
        "name": "yargs-parser",
        "version": "20.2.9",
        "direct": false
      },
      {
        "name": "yn",
        "version": "3.1.1",
        "direct": false
      },
      {
        "name": "yocto-queue",
        "version": "0.1.0",
        "direct": false
      },
      {
        "name": "zurk",
        "version": "0.11.10",
        "direct": true
      },
      {
        "name": "zwitch",
        "version": "2.0.4",
        "direct": false
      }
    ],
    "edges": {
      "@algolia/abtesting": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/autocomplete-core": [
        "@algolia/autocomplete-plugin-algolia-insights",
        "@algolia/autocomplete-shared"
      ],
      "@algolia/autocomplete-plugin-algolia-insights": [
        "@algolia/autocomplete-shared"
      ],
      "@algolia/autocomplete-preset-algolia": [
        "@algolia/autocomplete-shared"
      ],
      "@algolia/client-abtesting": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/client-analytics": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/client-insights": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/client-personalization": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/client-query-suggestions": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/client-search": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/ingestion": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/monitoring": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/recommend": [
        "@algolia/client-common",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "@algolia/requester-browser-xhr": [
        "@algolia/client-common"
      ],
      "@algolia/requester-fetch": [
        "@algolia/client-common"
      ],
      "@algolia/requester-node-http": [
        "@algolia/client-common"
      ],
      "@babel/code-frame": [
        "@babel/helper-validator-identifier",
        "js-tokens",
        "picocolors"
      ],
      "@babel/parser": [
        "@babel/types"
      ],
      "@babel/types": [
        "@babel/helper-string-parser",
        "@babel/helper-validator-identifier"
      ],
      "@commitlint/cli": [
        "@commitlint/format",
        "@commitlint/lint",
        "@commitlint/load",
        "@commitlint/read",
        "@commitlint/types",
        "tinyexec",
        "yargs"
      ],
      "@commitlint/config-conventional": [
        "@commitlint/types",
        "conventional-changelog-conventionalcommits"
      ],
      "@commitlint/config-validator": [
        "@commitlint/types",
        "ajv"
      ],
      "@commitlint/ensure": [
        "@commitlint/types",
        "lodash.camelcase",
        "lodash.kebabcase",
        "lodash.snakecase",
        "lodash.startcase",
        "lodash.upperfirst"
      ],
      "@commitlint/format": [
        "@commitlint/types",
        "picocolors"
      ],
      "@commitlint/is-ignored": [
        "@commitlint/types",
        "semver"
      ],
      "@commitlint/lint": [
        "@commitlint/is-ignored",
        "@commitlint/parse",
        "@commitlint/rules",
        "@commitlint/types"
      ],
      "@commitlint/load": [
        "@commitlint/config-validator",
        "@commitlint/execute-rule",
        "@commitlint/resolve-extends",
        "@commitlint/types",
        "cosmiconfig",
        "cosmiconfig-typescript-loader",
        "is-plain-obj",
        "lodash.mergewith",
        "picocolors"
      ],
      "@commitlint/parse": [
        "@commitlint/types",
        "conventional-changelog-angular",
        "conventional-commits-parser"
      ],
      "@commitlint/read": [
        "@commitlint/top-level",
        "@commitlint/types",
        "git-raw-commits",
        "minimist",
        "tinyexec"
      ],
      "@commitlint/resolve-extends": [
        "@commitlint/config-validator",
        "@commitlint/types",
        "global-directory",
        "import-meta-resolve",
        "lodash.mergewith",
        "resolve-from"
      ],
      "@commitlint/rules": [
        "@commitlint/ensure",
        "@commitlint/message",
        "@commitlint/to-lines",
        "@commitlint/types"
      ],
      "@commitlint/top-level": [
        "escalade"
      ],
      "@commitlint/types": [
        "conventional-commits-parser",
        "picocolors"
      ],
      "@conventional-changelog/git-client": [
        "@simple-libs/child-process-utils",
        "@simple-libs/stream-utils",
        "semver"
      ],
      "@cspotcode/source-map-support": [
        "@jridgewell/trace-mapping"
      ],
      "@dependents/detective-less": [
        "gonzales-pe",
        "node-source-walk"
      ],
      "@docsearch/js": [
        "@docsearch/react",
        "preact"
      ],
      "@docsearch/react": [
        "@algolia/autocomplete-core",
        "@algolia/autocomplete-preset-algolia",
        "@docsearch/css",
        "algoliasearch"
      ],
      "@iconify-json/simple-icons": [
        "@iconify/types"
      ],
      "@jest/schemas": [
        "@sinclair/typebox"
      ],
      "@jridgewell/trace-mapping": [
        "@jridgewell/resolve-uri",
        "@jridgewell/sourcemap-codec"
      ],
      "@nodelib/fs.scandir": [
        "@nodelib/fs.stat",
        "run-parallel"
      ],
      "@nodelib/fs.walk": [
        "@nodelib/fs.scandir",
        "fastq"
      ],
      "@shikijs/core": [
        "@shikijs/engine-javascript",
        "@shikijs/engine-oniguruma",
        "@shikijs/types",
        "@shikijs/vscode-textmate",
        "@types/hast",
        "hast-util-to-html"
      ],
      "@shikijs/engine-javascript": [
        "@shikijs/types",
        "@shikijs/vscode-textmate",
        "oniguruma-to-es"
      ],
      "@shikijs/engine-oniguruma": [
        "@shikijs/types",
        "@shikijs/vscode-textmate"
      ],
      "@shikijs/langs": [
        "@shikijs/types"
      ],
      "@shikijs/themes": [
        "@shikijs/types"
      ],
      "@shikijs/transformers": [
        "@shikijs/core",
        "@shikijs/types"
      ],
      "@shikijs/types": [
        "@shikijs/vscode-textmate",
        "@types/hast"
      ],
      "@simple-libs/child-process-utils": [
        "@simple-libs/stream-utils"
      ],
      "@ts-graphviz/adapter": [
        "@ts-graphviz/common"
      ],
      "@ts-graphviz/ast": [
        "@ts-graphviz/common"
      ],
      "@ts-graphviz/core": [
        "@ts-graphviz/ast",
        "@ts-graphviz/common"
      ],
      "@types/eslint": [
        "@types/estree",
        "@types/json-schema"
      ],
      "@types/fs-extra": [
        "@types/jsonfile",
        "@types/node"
      ],
      "@types/hast": [
        "@types/unist"
      ],
      "@types/jsonfile": [
        "@types/node"
      ],
      "@types/markdown-it": [
        "@types/linkify-it",
        "@types/mdurl"
      ],
      "@types/mdast": [
        "@types/unist"
      ],
      "@types/node": [
        "undici-types"
      ],
      "@typescript-eslint/project-service": [
        "@typescript-eslint/tsconfig-utils",
        "@typescript-eslint/types",
        "debug"
      ],
      "@typescript-eslint/typescript-estree": [
        "@typescript-eslint/project-service",
        "@typescript-eslint/tsconfig-utils",
        "@typescript-eslint/types",
        "@typescript-eslint/visitor-keys",
        "debug",
        "minimatch",
        "semver",
        "tinyglobby",
        "ts-api-utils"
      ],
      "@typescript-eslint/visitor-keys": [
        "@typescript-eslint/types",
        "eslint-visitor-keys"
      ],
      "@vue/compiler-core": [
        "@babel/parser",
        "@vue/shared",
        "entities",
        "estree-walker",
        "source-map-js"
      ],
      "@vue/compiler-dom": [
        "@vue/compiler-core",
        "@vue/shared"
      ],
      "@vue/compiler-sfc": [
        "@babel/parser",
        "@vue/compiler-core",
        "@vue/compiler-dom",
        "@vue/compiler-ssr",
        "@vue/shared",
        "estree-walker",
        "magic-string",
        "postcss",
        "source-map-js"
      ],
      "@vue/compiler-ssr": [
        "@vue/compiler-dom",
        "@vue/shared"
      ],
      "@vue/devtools-api": [
        "@vue/devtools-kit"
      ],
      "@vue/devtools-kit": [
        "@vue/devtools-shared",
        "birpc",
        "hookable",
        "mitt",
        "perfect-debounce",
        "speakingurl",
        "superjson"
      ],
      "@vue/devtools-shared": [
        "rfdc"
      ],
      "@vue/reactivity": [
        "@vue/shared"
      ],
      "@vue/runtime-core": [
        "@vue/reactivity",
        "@vue/shared"
      ],
      "@vue/runtime-dom": [
        "@vue/reactivity",
        "@vue/runtime-core",
        "@vue/shared",
        "csstype"
      ],
      "@vue/server-renderer": [
        "@vue/compiler-ssr",
        "@vue/shared"
      ],
      "@vueuse/core": [
        "@types/web-bluetooth",
        "@vueuse/metadata",
        "@vueuse/shared",
        "vue"
      ],
      "@vueuse/integrations": [
        "@vueuse/core",
        "@vueuse/shared",
        "vue"
      ],
      "@vueuse/shared": [
        "vue"
      ],
      "@webpod/ps": [
        "@webpod/ingrid",
        "zurk"
      ],
      "acorn-walk": [
        "acorn"
      ],
      "ajv": [
        "fast-deep-equal",
        "fast-uri",
        "json-schema-traverse",
        "require-from-string"
      ],
      "algoliasearch": [
        "@algolia/abtesting",
        "@algolia/client-abtesting",
        "@algolia/client-analytics",
        "@algolia/client-common",
        "@algolia/client-insights",
        "@algolia/client-personalization",
        "@algolia/client-query-suggestions",
        "@algolia/client-search",
        "@algolia/ingestion",
        "@algolia/monitoring",
        "@algolia/recommend",
        "@algolia/requester-browser-xhr",
        "@algolia/requester-fetch",
        "@algolia/requester-node-http"
      ],
      "ansi-escapes": [
        "type-fest"
      ],
      "ansi-styles": [
        "color-convert"
      ],
      "bl": [
        "buffer",
        "inherits",
        "readable-stream"
      ],
      "brace-expansion": [
        "balanced-match"
      ],
      "braces": [
        "fill-range"
      ],
      "buffer": [
        "base64-js",
        "ieee754"
      ],
      "c8": [
        "@bcoe/v8-coverage",
        "@istanbuljs/schema",
        "find-up",
        "foreground-child",
        "istanbul-lib-coverage",
        "istanbul-lib-report",
        "istanbul-reports",
        "test-exclude",
        "v8-to-istanbul",
        "yargs",
        "yargs-parser"
      ],
      "camelcase-keys": [
        "camelcase",
        "map-obj",
        "quick-lru"
      ],
      "chalk": [
        "ansi-styles",
        "supports-color"
      ],
      "cli-cursor": [
        "restore-cursor"
      ],
      "cliui": [
        "string-width",
        "strip-ansi",
        "wrap-ansi"
      ],
      "color-convert": [
        "color-name"
      ],
      "compare-func": [
        "array-ify",
        "dot-prop"
      ],
      "conventional-changelog-angular": [
        "compare-func"
      ],
      "conventional-changelog-conventionalcommits": [
        "compare-func"
      ],
      "conventional-commits-parser": [
        "@simple-libs/stream-utils",
        "meow"
      ],
      "copy-anything": [
        "is-what"
      ],
      "cosmiconfig": [
        "env-paths",
        "import-fresh",
        "js-yaml",
        "parse-json"
      ],
      "cosmiconfig-typescript-loader": [
        "jiti"
      ],
      "cronometro": [
        "acquerello",
        "hdr-histogram-js",
        "table"
      ],
      "cross-spawn": [
        "path-key",
        "shebang-command",
        "which"
      ],
      "debug": [
        "ms"
      ],
      "decamelize-keys": [
        "decamelize",
        "map-obj"
      ],
      "defaults": [
        "clone"
      ],
      "dependency-tree": [
        "commander",
        "filing-cabinet",
        "precinct",
        "typescript"
      ],
      "detective-amd": [
        "ast-module-types",
        "escodegen",
        "get-amd-module-type",
        "node-source-walk"
      ],
      "detective-cjs": [
        "ast-module-types",
        "node-source-walk"
      ],
      "detective-es6": [
        "node-source-walk"
      ],
      "detective-postcss": [
        "is-url",
        "postcss-values-parser"
      ],
      "detective-sass": [
        "gonzales-pe",
        "node-source-walk"
      ],
      "detective-scss": [
        "gonzales-pe",
        "node-source-walk"
      ],
      "detective-typescript": [
        "@typescript-eslint/typescript-estree",
        "ast-module-types",
        "node-source-walk"
      ],
      "detective-vue2": [
        "@dependents/detective-less",
        "@vue/compiler-sfc",
        "detective-es6",
        "detective-sass",
        "detective-scss",
        "detective-stylus",
        "detective-typescript"
      ],
      "devlop": [
        "dequal"
      ],
      "dir-glob": [
        "path-type"
      ],
      "dot-prop": [
        "is-obj"
      ],
      "dts-bundle-generator": [
        "typescript",
        "yargs"
      ],
      "enhanced-resolve": [
        "graceful-fs",
        "tapable"
      ],
      "error-ex": [
        "is-arrayish"
      ],
      "esbuild-node-externals": [
        "empathic"
      ],
      "esbuild-plugin-entry-chunks": [
        "depseek",
        "esbuild-plugin-utils"
      ],
      "esbuild-plugin-extract-helpers": [
        "esbuild-plugin-utils"
      ],
      "esbuild-plugin-hybrid-export": [
        "esbuild-plugin-utils"
      ],
      "esbuild-plugin-transform-hook": [
        "esbuild-plugin-utils"
      ],
      "escodegen": [
        "esprima",
        "estraverse",
        "esutils"
      ],
      "eslint-formatter-pretty": [
        "@types/eslint",
        "ansi-escapes",
        "chalk",
        "eslint-rule-docs",
        "log-symbols",
        "plur",
        "string-width",
        "supports-hyperlinks"
      ],
      "fast-glob": [
        "@nodelib/fs.stat",
        "@nodelib/fs.walk",
        "glob-parent",
        "merge2",
        "micromatch"
      ],
      "fastq": [
        "reusify"
      ],
      "filing-cabinet": [
        "app-module-path",
        "commander",
        "enhanced-resolve",
        "module-definition",
        "module-lookup-amd",
        "resolve",
        "resolve-dependency-path",
        "sass-lookup",
        "stylus-lookup",
        "tsconfig-paths",
        "typescript"
      ],
      "fill-range": [
        "to-regex-range"
      ],
      "find-up": [
        "locate-path",
        "path-exists"
      ],
      "focus-trap": [
        "tabbable"
      ],
      "foreground-child": [
        "cross-spawn",
        "signal-exit"
      ],
      "fs-extra": [
        "graceful-fs",
        "jsonfile",
        "universalify"
      ],
      "get-amd-module-type": [
        "ast-module-types",
        "node-source-walk"
      ],
      "get-tsconfig": [
        "resolve-pkg-maps"
      ],
      "git-raw-commits": [
        "@conventional-changelog/git-client",
        "meow"
      ],
      "glob": [
        "minimatch",
        "minipass",
        "path-scurry"
      ],
      "glob-parent": [
        "is-glob"
      ],
      "global-directory": [
        "ini"
      ],
      "globby": [
        "@sindresorhus/merge-streams",
        "array-union",
        "dir-glob",
        "fast-glob",
        "ignore",
        "is-path-inside",
        "merge2",
        "slash",
        "unicorn-magic"
      ],
      "gonzales-pe": [
        "minimist"
      ],
      "hasown": [
        "function-bind"
      ],
      "hast-util-to-html": [
        "@types/hast",
        "@types/unist",
        "ccount",
        "comma-separated-tokens",
        "hast-util-whitespace",
        "html-void-elements",
        "mdast-util-to-hast",
        "property-information",
        "space-separated-tokens",
        "stringify-entities",
        "zwitch"
      ],
      "hast-util-whitespace": [
        "@types/hast"
      ],
      "hdr-histogram-js": [
        "@assemblyscript/loader",
        "base64-js",
        "pako"
      ],
      "hosted-git-info": [
        "lru-cache"
      ],
      "import-fresh": [
        "parent-module",
        "resolve-from"
      ],
      "is-core-module": [
        "hasown"
      ],
      "is-glob": [
        "is-extglob"
      ],
      "istanbul-lib-report": [
        "istanbul-lib-coverage",
        "make-dir",
        "supports-color"
      ],
      "istanbul-reports": [
        "html-escaper",
        "istanbul-lib-report"
      ],
      "jest-diff": [
        "chalk",
        "diff-sequences",
        "jest-get-type",
        "pretty-format"
      ],
      "js-yaml": [
        "argparse"
      ],
      "jsonfile": [
        "universalify"
      ],
      "jsr": [
        "node-stream-zip",
        "semiver"
      ],
      "locate-path": [
        "p-locate"
      ],
      "log-symbols": [
        "chalk",
        "is-unicode-supported"
      ],
      "lru-cache": [
        "yallist"
      ],
      "madge": [
        "chalk",
        "commander",
        "commondir",
        "debug",
        "dependency-tree",
        "ora",
        "pluralize",
        "pretty-ms",
        "rc",
        "stream-to-array",
        "ts-graphviz",
        "walkdir"
      ],
      "magic-string": [
        "@jridgewell/sourcemap-codec"
      ],
      "make-dir": [
        "semver"
      ],
      "mdast-util-to-hast": [
        "@types/hast",
        "@types/mdast",
        "@ungap/structured-clone",
        "devlop",
        "micromark-util-sanitize-uri",
        "trim-lines",
        "unist-util-position",
        "unist-util-visit",
        "vfile"
      ],
      "meow": [
        "@types/minimist",
        "camelcase-keys",
        "decamelize",
        "decamelize-keys",
        "hard-rejection",
        "minimist-options",
        "normalize-package-data",
        "read-pkg-up",
        "redent",
        "trim-newlines",
        "type-fest",
        "yargs-parser"
      ],
      "micromark-util-character": [
        "micromark-util-symbol",
        "micromark-util-types"
      ],
      "micromark-util-sanitize-uri": [
        "micromark-util-character",
        "micromark-util-encode",
        "micromark-util-symbol"
      ],
      "micromatch": [
        "braces",
        "picomatch"
      ],
      "minimatch": [
        "brace-expansion"
      ],
      "minimist-options": [
        "arrify",
        "is-plain-obj",
        "kind-of"
      ],
      "module-definition": [
        "ast-module-types",
        "node-source-walk"
      ],
      "module-lookup-amd": [
        "commander",
        "requirejs",
        "requirejs-config-file"
      ],
      "nanospinner": [
        "picocolors"
      ],
      "node-source-walk": [
        "@babel/parser"
      ],
      "normalize-package-data": [
        "hosted-git-info",
        "is-core-module",
        "resolve",
        "semver",
        "validate-npm-package-license"
      ],
      "onetime": [
        "mimic-fn"
      ],
      "oniguruma-to-es": [
        "emoji-regex-xs",
        "regex",
        "regex-recursion"
      ],
      "ora": [
        "bl",
        "chalk",
        "cli-cursor",
        "cli-spinners",
        "is-interactive",
        "is-unicode-supported",
        "log-symbols",
        "strip-ansi",
        "wcwidth"
      ],
      "p-limit": [
        "p-try",
        "yocto-queue"
      ],
      "p-locate": [
        "p-limit"
      ],
      "parent-module": [
        "callsites"
      ],
      "parse-json": [
        "@babel/code-frame",
        "error-ex",
        "json-parse-even-better-errors",
        "lines-and-columns"
      ],
      "path-scurry": [
        "lru-cache",
        "minipass"
      ],
      "plur": [
        "irregular-plurals"
      ],
      "postcss": [
        "nanoid",
        "picocolors",
        "source-map-js"
      ],
      "postcss-values-parser": [
        "color-name",
        "is-url-superb",
        "quote-unquote"
      ],
      "precinct": [
        "@dependents/detective-less",
        "commander",
        "detective-amd",
        "detective-cjs",
        "detective-es6",
        "detective-postcss",
        "detective-sass",
        "detective-scss",
        "detective-stylus",
        "detective-typescript",
        "detective-vue2",
        "module-definition",
        "node-source-walk",
        "postcss",
        "typescript"
      ],
      "pretty-format": [
        "@jest/schemas",
        "ansi-styles",
        "react-is"
      ],
      "pretty-ms": [
        "parse-ms"
      ],
      "rc": [
        "deep-extend",
        "ini",
        "minimist",
        "strip-json-comments"
      ],
      "read-pkg": [
        "@types/normalize-package-data",
        "normalize-package-data",
        "parse-json",
        "type-fest"
      ],
      "read-pkg-up": [
        "find-up",
        "read-pkg",
        "type-fest"
      ],
      "readable-stream": [
        "inherits",
        "string_decoder",
        "util-deprecate"
      ],
      "redent": [
        "indent-string",
        "strip-indent"
      ],
      "regex": [
        "regex-utilities"
      ],
      "regex-recursion": [
        "regex-utilities"
      ],
      "requirejs-config-file": [
        "esprima",
        "stringify-object"
      ],
      "resolve": [
        "is-core-module",
        "path-parse",
        "supports-preserve-symlinks-flag"
      ],
      "restore-cursor": [
        "onetime",
        "signal-exit"
      ],
      "rollup": [
        "@types/estree"
      ],
      "run-parallel": [
        "queue-microtask"
      ],
      "sass-lookup": [
        "commander",
        "enhanced-resolve"
      ],
      "shebang-command": [
        "shebang-regex"
      ],
      "shiki": [
        "@shikijs/core",
        "@shikijs/engine-javascript",
        "@shikijs/engine-oniguruma",
        "@shikijs/langs",
        "@shikijs/themes",
        "@shikijs/types",
        "@shikijs/vscode-textmate",
        "@types/hast"
      ],
      "size-limit": [
        "bytes-iec",
        "lilconfig",
        "nanospinner",
        "picocolors",
        "tinyglobby"
      ],
      "slice-ansi": [
        "ansi-styles",
        "astral-regex",
        "is-fullwidth-code-point"
      ],
      "spdx-correct": [
        "spdx-expression-parse",
        "spdx-license-ids"
      ],
      "spdx-expression-parse": [
        "spdx-exceptions",
        "spdx-license-ids"
      ],
      "stream-to-array": [
        "any-promise"
      ],
      "string_decoder": [
        "safe-buffer"
      ],
      "string-width": [
        "emoji-regex",
        "is-fullwidth-code-point",
        "strip-ansi"
      ],
      "stringify-entities": [
        "character-entities-html4",
        "character-entities-legacy"
      ],
      "stringify-object": [
        "get-own-enumerable-property-symbols",
        "is-obj",
        "is-regexp"
      ],
      "strip-ansi": [
        "ansi-regex"
      ],
      "strip-indent": [
        "min-indent"
      ],
      "stylus-lookup": [
        "commander"
      ],
      "superjson": [
        "copy-anything"
      ],
      "supports-color": [
        "has-flag"
      ],
      "supports-hyperlinks": [
        "has-flag",
        "supports-color"
      ],
      "table": [
        "ajv",
        "lodash.truncate",
        "slice-ansi",
        "string-width",
        "strip-ansi"
      ],
      "test-exclude": [
        "@istanbuljs/schema",
        "glob",
        "minimatch"
      ],
      "tinyglobby": [
        "fdir",
        "picomatch"
      ],
      "to-regex-range": [
        "is-number"
      ],
      "ts-graphviz": [
        "@ts-graphviz/adapter",
        "@ts-graphviz/ast",
        "@ts-graphviz/common",
        "@ts-graphviz/core"
      ],
      "ts-node": [
        "@cspotcode/source-map-support",
        "@tsconfig/node10",
        "@tsconfig/node12",
        "@tsconfig/node14",
        "@tsconfig/node16",
        "acorn",
        "acorn-walk",
        "arg",
        "create-require",
        "diff",
        "make-error",
        "v8-compile-cache-lib",
        "yn"
      ],
      "tsconfig-paths": [
        "json5",
        "minimist",
        "strip-bom"
      ],
      "tsd": [
        "@tsd/typescript",
        "eslint-formatter-pretty",
        "globby",
        "jest-diff",
        "meow",
        "path-exists",
        "read-pkg-up"
      ],
      "tsx": [
        "esbuild",
        "get-tsconfig"
      ],
      "unist-util-is": [
        "@types/unist"
      ],
      "unist-util-position": [
        "@types/unist"
      ],
      "unist-util-stringify-position": [
        "@types/unist"
      ],
      "unist-util-visit": [
        "@types/unist",
        "unist-util-is",
        "unist-util-visit-parents"
      ],
      "unist-util-visit-parents": [
        "@types/unist",
        "unist-util-is"
      ],
      "v8-to-istanbul": [
        "@jridgewell/trace-mapping",
        "@types/istanbul-lib-coverage",
        "convert-source-map"
      ],
      "validate-npm-package-license": [
        "spdx-correct",
        "spdx-expression-parse"
      ],
      "vfile": [
        "@types/unist",
        "vfile-message"
      ],
      "vfile-message": [
        "@types/unist",
        "unist-util-stringify-position"
      ],
      "vite": [
        "esbuild",
        "postcss",
        "rollup"
      ],
      "vitepress": [
        "@docsearch/css",
        "@docsearch/js",
        "@iconify-json/simple-icons",
        "@shikijs/core",
        "@shikijs/transformers",
        "@shikijs/types",
        "@types/markdown-it",
        "@vitejs/plugin-vue",
        "@vue/devtools-api",
        "@vue/shared",
        "@vueuse/core",
        "@vueuse/integrations",
        "focus-trap",
        "mark.js",
        "minisearch",
        "shiki",
        "vite",
        "vue"
      ],
      "vue": [
        "@vue/compiler-dom",
        "@vue/compiler-sfc",
        "@vue/runtime-dom",
        "@vue/server-renderer",
        "@vue/shared"
      ],
      "wcwidth": [
        "defaults"
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
        "escalade",
        "get-caller-file",
        "require-directory",
        "string-width",
        "y18n",
        "yargs-parser"
      ]
    },
    "warnings": []
  },
  "dependencies": [
    {
      "name": "@algolia/abtesting",
      "versionRange": "1.12.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/abtesting was rate-limited or failed after retries: Request failed with status code 404",
        "GitHub advisory lookup for @algolia/abtesting failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:34.071Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/autocomplete-core",
      "versionRange": "1.17.7",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/autocomplete-core was rate-limited or failed after retries: Request failed with status code 404",
        "GitHub advisory lookup for @algolia/autocomplete-core failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-17T12:26:12.932Z",
        "daysSinceMaintained": 21,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/autocomplete-plugin-algolia-insights",
      "versionRange": "1.17.7",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/autocomplete-plugin-algolia-insights was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/autocomplete-plugin-algolia-insights failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-17T12:26:15.094Z",
        "daysSinceMaintained": 21,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/autocomplete-preset-algolia",
      "versionRange": "1.17.7",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/autocomplete-preset-algolia was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/autocomplete-preset-algolia failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-17T12:26:19.171Z",
        "daysSinceMaintained": 21,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/autocomplete-shared",
      "versionRange": "1.17.7",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/autocomplete-shared was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/autocomplete-shared failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-17T12:26:20.927Z",
        "daysSinceMaintained": 21,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/client-abtesting",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/client-abtesting was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/client-abtesting failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:33.376Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/client-analytics",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/client-analytics was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/client-analytics failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:31.784Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/client-common",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/client-common was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/client-common failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:23.275Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/client-insights",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/client-insights was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/client-insights failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:34.876Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/client-personalization",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/client-personalization was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/client-personalization failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:38.474Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/client-query-suggestions",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/client-query-suggestions was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/client-query-suggestions failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:38.284Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/client-search",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/client-search was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/client-search failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:37.680Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/ingestion",
      "versionRange": "1.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/ingestion was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/ingestion failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:43.156Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/monitoring",
      "versionRange": "1.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/monitoring was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/monitoring failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:43.153Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/recommend",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/recommend was rate-limited or failed after retries: Request failed with status code 404",
        "GitHub advisory lookup for @algolia/recommend failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:41.589Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/requester-browser-xhr",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/requester-browser-xhr was rate-limited or failed after retries: Request failed with status code 404",
        "GitHub advisory lookup for @algolia/requester-browser-xhr failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:26.658Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/requester-fetch",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/requester-fetch was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/requester-fetch failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:28.778Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@algolia/requester-node-http",
      "versionRange": "5.46.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @algolia/requester-node-http was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @algolia/requester-node-http failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-05-05T16:26:26.567Z",
        "daysSinceMaintained": 2,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@assemblyscript/loader",
      "versionRange": "0.19.23",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @assemblyscript/loader was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @assemblyscript/loader failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-29T03:35:55.790Z",
        "daysSinceMaintained": 9,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@babel/code-frame",
      "versionRange": "7.27.1",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @babel/code-frame was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @babel/code-frame failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-29T21:41:05.290Z",
        "daysSinceMaintained": 8,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@babel/helper-string-parser",
      "versionRange": "7.27.1",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @babel/helper-string-parser was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @babel/helper-string-parser failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-29T21:40:59.077Z",
        "daysSinceMaintained": 8,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@babel/helper-validator-identifier",
      "versionRange": "7.28.5",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @babel/helper-validator-identifier was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @babel/helper-validator-identifier failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-29T21:41:00.306Z",
        "daysSinceMaintained": 8,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@babel/parser",
      "versionRange": "7.28.5",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @babel/parser was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @babel/parser failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-30T21:33:29.797Z",
        "daysSinceMaintained": 7,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@babel/types",
      "versionRange": "7.28.5",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @babel/types was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @babel/types failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2026-04-29T21:41:29.266Z",
        "daysSinceMaintained": 8,
        "normalized": 0.1,
        "warning": null
      },
      "actualRisk": 0,
      "riskLevel": "LOW"
    },
    {
      "name": "@bcoe/v8-coverage",
      "versionRange": "1.0.2",
      "direct": false,
      "advisories": [],
      "warnings": [
        "NVD query for @bcoe/v8-coverage was rate-limited or failed after retries: Request failed with status code 429",
        "GitHub advisory lookup for @bcoe/v8-coverage failed after retries: API rate limit exceeded for 49.204.87.250. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) - https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      ],
      "cvssBaseScore": 0,
      "blastRadius": {
        "importCount": 0,
        "files": [],
        "normalized": 0.1
      },
      "maintenance": {
        "lastMaintainedAt": "2025-01-15T17:30:44.481Z",
        "daysSinceMaintained": 477,
        "normalized": 1,
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
