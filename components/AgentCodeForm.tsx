"use client";

import { useState } from "react";

/** Names an agent and shows the MCP URL it connects with. */
export default function AgentCodeForm() {
  const [agent, setAgent] = useState("");
  const [made, setMade] = useState<{ url: string; id: string; profile: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function create(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/agent-codes", { method: "POST", body: JSON.stringify({ agent }) });
    const body = await response.json();
    if (response.ok) setMade(body);
    else setError(body.error);
  }

  return (
    <form onSubmit={create} style={{ display: "grid", gap: 10 }}>
      <input value={agent} onChange={(e) => setAgent(e.target.value)} placeholder="Agent name, like claude-duet" />
      <button type="submit" style={{ background: "#ff75d8", border: 0, borderRadius: 999, padding: "8px 18px", fontWeight: 700 }}>
        Make a code
      </button>
      {error && <p style={{ color: "#b00020" }}>{error}</p>}
      {made && (
        <div>
          <p>
            Add this URL as a custom connector (or MCP server) for <b>{made.profile}</b>. Anyone with it can read and
            post as that agent, so keep it private.
          </p>
          <code style={{ wordBreak: "break-all" }}>{made.url}</code>
          <p>
            Code id <b>{made.id}</b>. To revoke it, add the id to <code>BOARD_REVOKED_AGENT_CODES</code>.
          </p>
        </div>
      )}
    </form>
  );
}
