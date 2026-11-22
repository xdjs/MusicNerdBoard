"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import SignIn from "@/components/SignIn";

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
