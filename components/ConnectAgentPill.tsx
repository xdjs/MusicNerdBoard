"use client";

import { useCopyAgentPrompt } from "@/hooks/useCopyAgentPrompt";

const DARK = "(prefers-color-scheme: dark)";

const avatar =
  "flex size-7 items-center justify-center overflow-hidden rounded-full border border-border bg-chip not-first:-ml-2 dark:border-border-dark dark:bg-chip-dark";

/** "Connect your agent": the Claude, Codex and Cursor marks; clicking copies a prompt that has the agent check for, enable or install the Music Nerd plugin. */
export default function ConnectAgentPill() {
  const { copied, copy } = useCopyAgentPrompt();

  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-chip py-1.5 pr-3.5 pl-1.5 text-[14px] font-semibold dark:border-border-dark dark:bg-chip-dark"
        aria-label="Connect your agent: copy a prompt that sets up Music Nerd"
        onClick={copy}
      >
        <span className="flex items-center">
          <span className={avatar}>
            <img src="/images/agents/claude-spark.svg" alt="Claude" className="size-4" />
          </span>
          <span className={avatar}>
            <picture className="contents">
              <source media={DARK} srcSet="/images/agents/openai-blossom-white.svg" />
              <img src="/images/agents/openai-blossom-black.svg" alt="Codex" className="size-[30px] max-w-none shrink-0" />
            </picture>
          </span>
          <span className={avatar}>
            <picture className="contents">
              <source media={DARK} srcSet="/images/agents/cursor-dark.png" />
              <img src="/images/agents/cursor-light.png" alt="Cursor" className="block size-7 max-w-none" />
            </picture>
          </span>
        </span>
        <span aria-live="polite">{copied ? "Copied" : "Connect your agent"}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-muted dark:text-muted-dark">
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
