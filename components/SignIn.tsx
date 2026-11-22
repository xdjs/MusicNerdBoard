"use client";

import ConnectAgentPill from "@/components/ConnectAgentPill";
import LoginFooter from "@/components/LoginFooter";
import LoginHeader from "@/components/LoginHeader";
import LoginHero from "@/components/LoginHero";
import RefusedCard from "@/components/RefusedCard";
import SignInCard from "@/components/SignInCard";
import { useSignIn } from "@/hooks/useSignIn";

/** Exchanges the Privy login (its access token) for a board session, then opens the board. */
export default function SignIn() {
  const { ready, authenticated, error, refused, startLogin } = useSignIn();

  return (
    <div className="flex min-h-dvh flex-col bg-page px-4 pt-5 pb-6 font-sans text-ink sm:p-0 dark:bg-page-dark dark:text-ink-dark">
      <LoginHeader />
      <main className="flex grow items-center justify-center sm:p-6">
        <section aria-labelledby="login-title" className="flex w-full flex-col gap-[18px] sm:max-w-[440px] sm:gap-5">
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
