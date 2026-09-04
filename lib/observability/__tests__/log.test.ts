import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logServerError } from "@/lib/observability/log";

describe("logServerError", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("logs only the error message, never the full error object", () => {
    const error = new Error("DB connection refused");
    logServerError("progress.get", error);

    expect(errorSpy).toHaveBeenCalledWith("[progress.get]", "DB connection refused", {});
  });

  it("drops any context key that looks like a secret, even if a caller adds one by mistake", () => {
    logServerError("checkout", new Error("boom"), {
      userId: "usr_123",
      password: "hunter2",
      sessionToken: "abc",
      email: "a@b.com",
    });

    const loggedContext = errorSpy.mock.calls[0][2];
    expect(loggedContext).toEqual({ userId: "usr_123" });
  });

  it("never throws, even for a non-Error thrown value", () => {
    expect(() => logServerError("scope", "raw string thrown")).not.toThrow();
    expect(() => logServerError("scope", null)).not.toThrow();
    expect(() => logServerError("scope", { weird: "object" })).not.toThrow();
  });
});
