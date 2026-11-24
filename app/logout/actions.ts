"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/session/const";

/** Ends this browser's board session. Other members' sessions are untouched. */
export async function signOut(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}
