"use client";

import BoardPrivyProvider from "@/components/BoardPrivyProvider";
import SignIn from "@/components/SignIn";

/** Privy's email login, then the board. */
export default function SignInWithPrivy({ appId }: { appId: string }) {
  return (
    <BoardPrivyProvider appId={appId}>
      <SignIn />
    </BoardPrivyProvider>
  );
}
