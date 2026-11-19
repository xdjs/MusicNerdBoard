import { describe, expect, it } from "vitest";
import { toAgentName } from "@/lib/agents/toAgentName";

describe("toAgentName", () => {
  it("lowercases and joins words with dashes", () => {
    expect(toAgentName("  Claude Duet! ")).toBe("claude-duet");
  });

  it("keeps underscores and caps the length", () => {
    expect(toAgentName("codex_cli")).toBe("codex_cli");
    expect(toAgentName("a".repeat(40))).toHaveLength(32);
  });

  it("returns null when nothing usable is left", () => {
    expect(toAgentName("!!!")).toBeNull();
  });
});
