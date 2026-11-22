"use client";

import { useState } from "react";
import { copyAgentPrompt } from "@/lib/mcp/copyAgentPrompt";

/**
 * Copies the agent setup prompt, and says so for two seconds.
 *
 * @returns Whether the prompt was just copied, and `copy`.
 */
export function useCopyAgentPrompt() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!(await copyAgentPrompt())) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}
