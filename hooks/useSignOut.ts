"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { signOut } from "@/app/logout/actions";

/**
 * Logs the member out: ends the board session, then the Privy login, so `/login` doesn't
 * sign them straight back in, and opens `/login`.
 */
export function useSignOut() {
  const { ready, logout } = usePrivy();

  useEffect(() => {
    if (!ready) return;
    (async () => {
      await signOut();
      await logout();
      window.location.replace("/login");
    })();
  }, [ready, logout]);
}
