#!/usr/bin/env node
import { spawn } from "node:child_process";
import { assertSafeQaEnvironment, loadEnvFile } from "./guards.ts";

const qaEnv = { ...process.env, ...loadEnvFile() };
assertSafeQaEnvironment(qaEnv);

const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-p", "3100"], {
  env: qaEnv,
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
