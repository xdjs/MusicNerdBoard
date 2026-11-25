/**
 * The styles of Connect your agent, as plain CSS: the login page renders them, and the board's Settings page,
 * which loads no stylesheet of ours and allows only inline styles, gets them injected. Colours are the login
 * page's theme (`app/globals.css`), light and dark.
 */
export const CONNECT_AGENT_CSS = `
.connect-agent { display: flex; min-height: 44px; margin: 0; cursor: pointer; align-items: center; gap: 10px; border: 1px solid rgba(66, 43, 70, 0.12); border-radius: 9999px; background: #ffffff; padding: 6px 14px 6px 6px; color: #1a1a1a; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; font-size: 14px; font-weight: 600; line-height: normal; letter-spacing: normal; }
.connect-agent-marks { display: flex; align-items: center; }
.connect-agent-mark { display: flex; width: 28px; height: 28px; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(66, 43, 70, 0.12); border-radius: 9999px; background: #ffffff; }
.connect-agent-mark:not(:first-child) { margin-left: -8px; }
.connect-agent-mark picture { display: contents; }
.connect-agent img, .connect-agent svg { display: block; vertical-align: middle; }
.connect-agent-claude { width: 16px; height: 16px; max-width: 100%; }
.connect-agent-codex { width: 30px; height: 30px; max-width: none; flex-shrink: 0; }
.connect-agent-cursor { width: 28px; height: 28px; max-width: none; }
.connect-agent svg { color: #5a4d5e; }
.connect-agent[data-copied] .connect-agent-copy, .connect-agent:not([data-copied]) .connect-agent-copied { display: none; }
@media (prefers-color-scheme: dark) {
  .connect-agent, .connect-agent-mark { border-color: rgba(255, 255, 255, 0.08); background: #2a282c; }
  .connect-agent { color: #f7fafc; }
  .connect-agent svg { color: #a0aec0; }
}
`;
