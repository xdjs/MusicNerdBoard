import { describe, expect, it, vi } from "vitest";
import { copyMcpUrl } from "@/lib/mcp/copyMcpUrl";

describe("copyMcpUrl", () => {
  it("copies Music Nerd's MCP URL", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    await expect(copyMcpUrl({ writeText })).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("https://api.musicnerd.net/mcp");
  });

  it("says so when the browser won't copy", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    await expect(copyMcpUrl({ writeText })).resolves.toBe(false);
  });
});
