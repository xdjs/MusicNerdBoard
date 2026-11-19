import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SESSION_MAX_AGE_SECONDS } from "@/lib/session/const";
import { createSession } from "@/lib/session/createSession";
import { readSession } from "@/lib/session/readSession";

describe("readSession", () => {
  beforeEach(() => {
    vi.stubEnv("BOARD_SESSION_SECRET", "test-secret");
    vi.stubEnv("BOARD_ALLOWED_EMAILS", "jade=jade@example.com");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("reads back the member a session was made for", () => {
    expect(readSession(createSession("jade@example.com"))).toBe("jade");
  });

  it("refuses a forged, missing or malformed session", () => {
    const [payload] = createSession("jade@example.com").split(".");
    expect(readSession(`${payload}.forged`)).toBeNull();
    expect(readSession(undefined)).toBeNull();
    expect(readSession("nodot")).toBeNull();
  });

  it("refuses an expired session", () => {
    const later = Date.now() + SESSION_MAX_AGE_SECONDS * 1000 + 1;
    expect(readSession(createSession("jade@example.com"), later)).toBeNull();
  });

  it("refuses a session once its email leaves the allowlist", () => {
    const session = createSession("jade@example.com");
    vi.stubEnv("BOARD_ALLOWED_EMAILS", "");
    expect(readSession(session)).toBeNull();
  });

  it("refuses a session signed with another secret", () => {
    const session = createSession("jade@example.com");
    vi.stubEnv("BOARD_SESSION_SECRET", "rotated");
    expect(readSession(session)).toBeNull();
  });
});
