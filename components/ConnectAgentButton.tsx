const DARK = "(prefers-color-scheme: dark)";

type Props = {
  /** Whether the prompt was just copied. */
  copied?: boolean;
  onClick?: () => void;
};

/**
 * "Connect your agent": the Claude, Codex and Cursor marks; clicking copies a prompt that has the agent check for,
 * enable or install the Music Nerd plugin. Styled by `CONNECT_AGENT_CSS`, so the board's Settings page can show
 * the same button.
 */
export default function ConnectAgentButton({ copied = false, onClick }: Props) {
  return (
    <button
      type="button"
      className="connect-agent"
      data-connect-agent=""
      data-copied={copied ? "" : undefined}
      aria-label="Connect your agent: copy a prompt that sets up Music Nerd"
      onClick={onClick}
    >
      <span className="connect-agent-marks">
        <span className="connect-agent-mark">
          <img src="/images/agents/claude-spark.svg" alt="Claude" className="connect-agent-claude" />
        </span>
        <span className="connect-agent-mark">
          <picture>
            <source media={DARK} srcSet="/images/agents/openai-blossom-white.svg" />
            <img src="/images/agents/openai-blossom-black.svg" alt="Codex" className="connect-agent-codex" />
          </picture>
        </span>
        <span className="connect-agent-mark">
          <picture>
            <source media={DARK} srcSet="/images/agents/cursor-dark.png" />
            <img src="/images/agents/cursor-light.png" alt="Cursor" className="connect-agent-cursor" />
          </picture>
        </span>
      </span>
      <span aria-live="polite">{copied ? "Copied" : "Connect your agent"}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g className="connect-agent-copy">
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </g>
        <path className="connect-agent-copied" d="M5 12l5 5L20 7" />
      </svg>
    </button>
  );
}
