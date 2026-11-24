"use client";

import { useSignOut } from "@/hooks/useSignOut";

/** Logs the member out of the board and Privy, then opens `/login`. */
export default function SignOut() {
  useSignOut();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-page font-sans text-[15px] text-muted dark:bg-page-dark dark:text-muted-dark">
      Logging out…
    </main>
  );
}
