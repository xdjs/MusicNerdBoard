import { MCP_URL } from "@/lib/mcp/const";

/**
 * Copies Music Nerd's MCP URL, for connecting an agent.
 *
 * @param clipboard - The browser's clipboard.
 * @returns Whether the URL was copied.
 */
export async function copyMcpUrl(
  clipboard: Pick<Clipboard, "writeText"> = navigator.clipboard,
): Promise<boolean> {
  try {
    await clipboard.writeText(MCP_URL);
    return true;
  } catch {
    return false;
  }
}
