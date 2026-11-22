import { describe, expect, it } from "vitest";
import { isNotOnTeam } from "@/lib/members/isNotOnTeam";

describe("isNotOnTeam", () => {
  it("is true when the team check refuses the email", () => {
    expect(isNotOnTeam({ error: "Not on the team", status: 403 })).toBe(true);
  });

  it("is false for other failures, so they keep their own message", () => {
    expect(isNotOnTeam({ error: "Not signed in", status: 401 })).toBe(false);
    expect(isNotOnTeam({ error: "Couldn't reach Music Nerd", status: 502 })).toBe(false);
  });

  it("is false once signed in", () => {
    expect(isNotOnTeam({ ok: true })).toBe(false);
  });
});
