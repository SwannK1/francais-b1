import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
import { assertSafeQaEnvironment, loadEnvFile } from "./scripts/qa/guards";

if (existsSync(".env.qa.local")) {
  Object.assign(process.env, loadEnvFile(".env.qa.local"));
}
assertSafeQaEnvironment(process.env);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30_000,
  outputDir: ".qa/playwright-results",
  reporter: "line",
  use: {
    baseURL: "http://localhost:3100",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run qa:dev",
    url: "http://localhost:3100/connexion",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
