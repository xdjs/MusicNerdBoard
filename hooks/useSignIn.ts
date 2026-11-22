"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { signIn } from "@/app/login/actions";
import { isNotOnTeam } from "@/lib/members/isNotOnTeam";

/**
 * Exchanges the Privy login (its access token) for a board session, then opens the board.
 * A refused or failed sign-in signs the member out of Privy and says why.
 *
 * @returns Whether Privy is ready and logged in, the refused email or other failure, and `startLogin`.
 */
export function useSignIn() {
  const { ready, authenticated, user, login, logout, getAccessToken } = usePrivy();
  const [error, setError] = useState<string | null>(null);
  const [refused, setRefused] = useState<{ email: string | null } | null>(null);

  const email = user?.email?.address ?? null;

  useEffect(() => {
    if (!ready || !authenticated) return;
    (async () => {
      const token = await getAccessToken();
      const result = token ? await signIn(token) : { error: "Not signed in", status: 401 };
      if ("ok" in result) return window.location.assign("/board");
      if (isNotOnTeam(result)) setRefused({ email });
      else setError(result.error);
      await logout();
    })();
  }, [ready, authenticated, email, getAccessToken, logout]);

  const startLogin = () => {
    setError(null);
    setRefused(null);
    login();
  };

  return { ready, authenticated, error, refused, startLogin };
}
