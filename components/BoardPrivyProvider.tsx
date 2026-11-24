"use client";

import { PrivyProvider } from "@privy-io/react-auth";

/** Privy's email login, set up the way the board signs members in and out. */
export default function BoardPrivyProvider({ appId, children }: { appId: string; children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={appId}
      config={{ loginMethods: ["email"], appearance: { theme: "light", accentColor: "#ff75d8" } }}
    >
      {children}
    </PrivyProvider>
  );
}
