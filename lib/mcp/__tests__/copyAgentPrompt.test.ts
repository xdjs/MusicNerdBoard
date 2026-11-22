import { describe, expect, it, vi } from "vitest";
import { copyAgentPrompt } from "@/lib/mcp/copyAgentPrompt";
import { AGENT_PROMPT } from "@/lib/mcp/const";

describe("copyAgentPrompt", () => {
  it("copies the prompt that has an agent check for, or set up, Music Nerd's MCP server", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    await expect(copyAgentPrompt({ writeText })).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith(AGENT_PROMPT);
    expect(AGENT_PROMPT).toContain("https://api.musicnerd.net/mcp");
    expect(AGENT_PROMPT).toContain("https://docs.musicnerd.net/mcp");
  });

  it("says so when the browser won't copy", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    await expect(copyAgentPrompt({ writeText })).resolves.toBe(false);
  });
});
