import { afterEach, describe, expect, it, vi } from "vitest";
import { findMember } from "@/lib/members/findMember";

describe("findMember", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("finds a member by email, ignoring case", () => {
    vi.stubEnv("BOARD_ALLOWED_EMAILS", "pete=pete@example.com");
    expect(findMember("Pete@Example.com")).toBe("pete");
  });

  it("returns null for an email that isn't on the team", () => {
    vi.stubEnv("BOARD_ALLOWED_EMAILS", "pete=pete@example.com");
    expect(findMember("stranger@example.com")).toBeNull();
  });
});
