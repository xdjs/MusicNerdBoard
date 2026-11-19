"use client";

import { PrivyProvider, useIdentityToken, usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

/** Exchanges the Privy login (its identity token) for a board session, then opens the board. */
function SignIn() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { identityToken } = useIdentityToken();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !authenticated || !identityToken) return;
    (async () => {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { authorization: `Bearer ${identityToken}` },
      });
      if (response.ok) return window.location.assign("/board");
      setError((await response.json()).error);
      await logout();
    })();
  }, [ready, authenticated, identityToken, logout]);

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
