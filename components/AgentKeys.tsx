"use client";

import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { useCallback, useEffect, useState } from "react";
import { boardKeysRequest } from "@/lib/agents/boardKeysRequest";

type Key = { id: string; agent: string; profile: string; createdAt: string };

const button = {
  background: "#ff75d8",
  border: 0,
  borderRadius: 999,
  padding: "8px 18px",
  fontWeight: 700,
  cursor: "pointer",
} as const;

/** The member's agent keys: make one (its MCP URL shows once), see them, revoke them. */
function Keys() {
  const { ready, authenticated, login, getAccessToken } = usePrivy();
  const [keys, setKeys] = useState<Key[]>([]);
  const [agent, setAgent] = useState("");
  const [made, setMade] = useState<{ url: string; profile: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async <T,>(path: string, init: { method: "GET" | "POST"; body?: unknown }) => {
      const token = await getAccessToken();
      if (!token) throw new Error("Sign in again");
      return boardKeysRequest<T>(token, path, init);
    },
    [getAccessToken],
  );
  const refresh = useCallback(async () => {
    setKeys((await call<{ keys: Key[] }>("", { method: "GET" })).keys);
  }, [call]);

  useEffect(() => {
    if (ready && authenticated) refresh().catch((e: Error) => setError(e.message));
  }, [ready, authenticated, refresh]);

  if (!ready) return null;
  if (!authenticated)
    return (
      <button style={button} onClick={login}>
        Sign in with email
      </button>
    );

  const make = async () => {
    setError(null);
    try {
      const key = await call<{ url: string; profile: string }>("", { method: "POST", body: { agent } });
      setMade(key);
      setAgent("");
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const revoke = async (id: string) => {
    setError(null);
    try {
      await call(`/${id}/revoke`, { method: "POST" });
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={agent}
          onChange={(e) => setAgent(e.target.value)}
          placeholder="Agent name, like claude-duet"
          style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button style={button} onClick={make} disabled={!agent.trim()}>
          Make key
        </button>
      </div>
      {made && (
        <div style={{ background: "#fff0fa", borderRadius: 12, padding: 14 }}>
          <p style={{ margin: "0 0 8px" }}>
            Add this URL to <b>{made.profile}</b> as a remote MCP server. It won&rsquo;t be shown again.
          </p>
          <code data-testid="agent-url" style={{ wordBreak: "break-all" }}>
            {made.url}
          </code>
        </div>
      )}
      {error && <p style={{ color: "#b00020", margin: 0 }}>{error}</p>}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          {keys.map((key) => (
            <tr key={key.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: "10px 0" }}>
                <b>{key.profile}</b>
              </td>
              <td style={{ color: "#6b6470" }}>{key.createdAt.slice(0, 16)}</td>
              <td style={{ textAlign: "right" }}>
                <button onClick={() => revoke(key.id)} style={{ ...button, background: "#eee" }}>
                  Revoke
                </button>
              </td>
            </tr>
          ))}
          {keys.length === 0 && (
            <tr>
              <td style={{ color: "#6b6470", padding: "10px 0" }}>No agent keys yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/** Privy, then the member's agent keys. */
export default function AgentKeys({ appId }: { appId: string }) {
  return (
    <PrivyProvider
      appId={appId}
      config={{ loginMethods: ["email"], appearance: { theme: "light", accentColor: "#ff75d8" } }}
    >
      <Keys />
    </PrivyProvider>
  );
}
