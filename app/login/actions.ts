"use server";

import { cookies } from "next/headers";
import { getBoardMember } from "@/lib/members/getBoardMember";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/session/const";
import { createSession } from "@/lib/session/createSession";

/**
 * Signs a team member in: their Privy access token, checked by MusicNerdAPI,
 * becomes a signed session cookie on this domain.
 *
 * @param accessToken - The member's Privy access token.
 * @returns `{ ok: true }`, or why sign-in was refused.
 */
export async function signIn(accessToken: string): Promise<{ ok: true } | { error: string }> {
  const member = await getBoardMember(accessToken);
  if ("error" in member) return { error: member.error };
  (await cookies()).set(SESSION_COOKIE, createSession(member.name), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return { ok: true };
}
