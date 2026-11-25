import { AGENT_PROMPT } from "@/lib/mcp/const";
import { escapeAttribute } from "@/lib/inspect/escapeAttribute";

/**
 * Loads `public/connect-agent.js` into the inspector's page, which puts **Connect your agent** on
 * its Settings page: `@vercel/board` offers no slot for one. The script copies the same prompt as
 * the login page, handed to it in `data-prompt`.
 *
 * @param html - The page the inspector served.
 * @returns The page, with the script before `</body>`.
 */
export function addConnectAgent(html: string): string {
  return html.replace(
    "</body>",
    () => `<script src="/connect-agent.js" data-prompt="${escapeAttribute(AGENT_PROMPT)}" defer></script>\n</body>`,
  );
}
