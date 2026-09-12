import { describe, expect, it } from "vitest";
import { assertSafeQaEnvironment } from "./guards";

const safe: Record<string, string | undefined> = {
  NODE_ENV: "test",
  QA_ENV: "true",
  DATABASE_DRIVER: "postgres",
  DATABASE_URL: "postgresql://user:secret@127.0.0.1:55432/francais_b1_qa",
  QA_USER_EMAIL: "premium@example.test",
  QA_USER_PASSWORD: "secret",
  QA_FREE_USER_EMAIL: "free@example.test",
  QA_FREE_USER_PASSWORD: "secret",
};

describe("QA environment safeguards", () => {
  it("accepte uniquement une base QA locale explicitement activée", () => {
    expect(() => assertSafeQaEnvironment(safe)).not.toThrow();
  });

  it.each([
    { NODE_ENV: "production" },
    { QA_ENV: "false" },
    { DATABASE_DRIVER: "neon" },
    { DATABASE_URL: "postgresql://user:secret@db.example.com/francais_b1_qa" },
    { DATABASE_URL: "postgresql://user:secret@127.0.0.1:55432/francais_b1" },
    { QA_USER_PASSWORD: "" },
  ])("refuse une configuration dangereuse ou incomplète : %o", (override) => {
    expect(() => assertSafeQaEnvironment({ ...safe, ...override })).toThrow();
  });
});
