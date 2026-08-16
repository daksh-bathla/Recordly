#!/usr/bin/env node
// Builds (if needed) and launches Recordly as a desktop app for local testing.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

function run(cmd, args) {
	const result = spawnSync(cmd, args, { stdio: "inherit" });
	if (result.status !== 0) process.exit(result.status ?? 1);
}

if (!existsSync("dist-electron/main.cjs") || !existsSync("dist/index.html")) {
	run("npx", ["tsc", "-p", "tsconfig.json"]);
	run("npx", ["vite", "build", "--config", "vite.config.ts"]);
	run("npm", ["run", "normalize:electron-main-cjs"]);
}

run("npx", ["electron", "."]);
