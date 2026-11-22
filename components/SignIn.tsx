"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { signIn } from "@/app/login/actions";
import ConnectAgentPill from "@/components/ConnectAgentPill";
import LoginFooter from "@/components/LoginFooter";
import LoginHeader from "@/components/LoginHeader";
import LoginHero from "@/components/LoginHero";
import RefusedCard from "@/components/RefusedCard";
import SignInCard from "@/components/SignInCard";
import styles from "@/components/login.module.css";
import { isNotOnTeam } from "@/lib/members/isNotOnTeam";

/** Exchanges the Privy login (its access token) for a board session, then opens the board. */
export default function SignIn() {
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

  return (
    <div className={styles.page}>
      <LoginHeader />
      <main className={styles.main}>
        <section aria-labelledby="login-title" className={styles.section}>
          <LoginHero />
          {refused ? (
            <RefusedCard email={refused.email} onTryAgain={startLogin} />
          ) : (
            <SignInCard onSignIn={startLogin} disabled={!ready || authenticated} error={error} />
          )}
          <ConnectAgentPill />
        </section>
      </main>
      <LoginFooter />
    </div>
  );
}
