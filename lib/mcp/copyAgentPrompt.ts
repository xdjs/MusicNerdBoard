import { AGENT_PROMPT } from "@/lib/mcp/const";

/**
 * Copies the prompt that has an agent check for, enable or offer to install the Music Nerd plugin.
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
