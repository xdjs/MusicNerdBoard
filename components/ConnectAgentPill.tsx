"use client";

import { useState } from "react";
import styles from "@/components/login.module.css";
import { copyAgentPrompt } from "@/lib/mcp/copyAgentPrompt";

const DARK = "(prefers-color-scheme: dark)";

/** "Connect your agent": the Claude, Codex and Cursor marks; clicking copies a prompt that has the agent check for, or set up, Music Nerd's MCP server. */
export default function ConnectAgentPill() {
  const [copied, setCopied] = useState(false);

  return (
    <div className={styles.pillRow}>
      <button
        type="button"
        className={styles.pill}
        aria-label="Connect your agent: copy a prompt that sets up Music Nerd"
        onClick={async () => {
          if (!(await copyAgentPrompt())) return;
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        <span className={styles.avatars}>
          <span className={styles.avatar}>
            <img src="/claude-spark.svg" alt="Claude" className={styles.spark} />
          </span>
          <span className={styles.avatar}>
            <picture>
              <source media={DARK} srcSet="/openai-blossom-white.svg" />
              <img src="/openai-blossom-black.svg" alt="Codex" className={styles.blossom} />
            </picture>
          </span>
          <span className={styles.avatar}>
            <picture>
              <source media={DARK} srcSet="/cursor-dark.png" />
              <img src="/cursor-light.png" alt="Cursor" className={styles.cursor} />
            </picture>
          </span>
        </span>
        <span aria-live="polite">{copied ? "Copied" : "Connect your agent"}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
          {copied ? (
            <path d="M5 12l5 5L20 7" />
          ) : (
            <>
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
