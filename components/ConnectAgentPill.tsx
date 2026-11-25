"use client";

import ConnectAgentButton from "@/components/ConnectAgentButton";
import { useCopyAgentPrompt } from "@/hooks/useCopyAgentPrompt";
import { CONNECT_AGENT_CSS } from "@/lib/mcp/connectAgentCss";

/** The login page's Connect your agent, centred; it says "Copied" for two seconds after copying the prompt. */
export default function ConnectAgentPill() {
  const { copied, copy } = useCopyAgentPrompt();

  return (
    <div className="flex justify-center">
      <style href="connect-agent" precedence="default">
        {CONNECT_AGENT_CSS}
      </style>
      <ConnectAgentButton copied={copied} onClick={copy} />
    </div>
  );
}
