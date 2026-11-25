// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { addConnectAgent } from "@/lib/inspect/addConnectAgent";
import { AGENT_PROMPT } from "@/lib/mcp/const";

const page = `<body>
<div id="root"></div>
<script type="module" src="/board/app.js?v=1"></script>
</body>
</html>`;

describe("addConnectAgent", () => {
  it("loads the script that puts Connect your agent on the Settings page, with the login page's prompt", () => {
    const html = addConnectAgent(page);
    const script = new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector<HTMLScriptElement>('script[src="/connect-agent.js"]')!;
    expect(script.defer).toBe(true);
    expect(script.dataset.prompt).toBe(AGENT_PROMPT);
    expect(html).toMatch(/<\/script>\n<\/body>/);
  });

  it("leaves the rest of the page alone", () => {
    expect(addConnectAgent(page).replace(/<script src="\/connect-agent\.js"[^>]*><\/script>\n/, "")).toBe(page);
  });
});
