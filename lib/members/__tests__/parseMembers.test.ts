import { describe, expect, it } from "vitest";
import { parseMembers } from "@/lib/members/parseMembers";

describe("parseMembers", () => {
  it("maps each lowercased email to its name", () => {
    const members = parseMembers("sweetman=Sweet@Example.com, cy=cy@example.com");
    expect(members.get("sweet@example.com")).toBe("sweetman");
    expect(members.get("cy@example.com")).toBe("cy");
  });

  it("skips malformed pairs and an unset list", () => {
    expect(parseMembers("nobody, =x@example.com,carl=").size).toBe(0);
    expect(parseMembers(undefined).size).toBe(0);
  });
});
