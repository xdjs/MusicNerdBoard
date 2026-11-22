import { AGENT_PROMPT } from "@/lib/mcp/const";

/**
 * Copies the prompt that has an agent check for, or offer to set up, Music Nerd's MCP server.
 *
 * @param clipboard - The browser's clipboard.
 * @returns Whether the prompt was copied.
 */
export async function copyAgentPrompt(
  clipboard: Pick<Clipboard, "writeText"> = navigator.clipboard,
): Promise<boolean> {
  try {
    await clipboard.writeText(AGENT_PROMPT);
    return true;
  } catch {
    return false;
  }
}
