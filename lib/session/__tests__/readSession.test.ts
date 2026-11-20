import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SESSION_MAX_AGE_SECONDS } from "@/lib/session/const";
import { createSession } from "@/lib/session/createSession";
import { readSession } from "@/lib/session/readSession";

describe("readSession", () => {
  beforeEach(() => vi.stubEnv("BOARD_SESSION_SECRET", "test-secret"));
  afterEach(() => vi.unstubAllEnvs());

  it("reads back the member a session was made for", () => {
    expect(readSession(createSession("jade"))).toEqual({ name: "jade" });
  });

  it("refuses a forged, missing or malformed session", () => {
    const [payload] = createSession("jade").split(".");
    expect(readSession(`${payload}.forged`)).toBeNull();
    expect(readSession(undefined)).toBeNull();
    expect(readSession("nodot")).toBeNull();
  });

  it("lasts a day", () => {
    expect(SESSION_MAX_AGE_SECONDS).toBe(24 * 60 * 60);
    const later = Date.now() + SESSION_MAX_AGE_SECONDS * 1000 + 1;
    expect(readSession(createSession("jade"), later)).toBeNull();
  });

  it("refuses a session signed with another secret", () => {
    const session = createSession("jade");
    vi.stubEnv("BOARD_SESSION_SECRET", "rotated");
    expect(readSession(session)).toBeNull();
  });
});
