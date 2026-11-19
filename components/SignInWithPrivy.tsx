"use client";

import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

/** Exchanges the Privy login for a board session, then opens the board. */
function SignIn() {
  const { ready, authenticated, login, logout, getAccessToken } = usePrivy();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !authenticated) return;
    (async () => {
      const token = await getAccessToken();
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.ok) return window.location.assign("/board");
      setError((await response.json()).error);
      await logout();
    })();
  }, [ready, authenticated, getAccessToken, logout]);

  return (
    <main style={{ display: "grid", placeItems: "center", minHeight: "100vh", gap: 12 }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ letterSpacing: "-0.04em" }}>music nerd board</h1>
        <button
          onClick={login}
          disabled={!ready || authenticated}
          style={{ background: "#ff75d8", border: 0, borderRadius: 999, padding: "10px 22px", fontWeight: 700, cursor: "pointer" }}
        >
          Sign in with email
        </button>
        {error && <p style={{ color: "#b00020" }}>{error}</p>}
      </div>
    </main>
  );
}

/** Privy's email login, then the board. */
export default function SignInWithPrivy({ appId }: { appId: string }) {
  return (
    <PrivyProvider
      appId={appId}
      config={{ loginMethods: ["email"], appearance: { theme: "light", accentColor: "#ff75d8" } }}
    >
      <SignIn />
    </PrivyProvider>
  );
}
