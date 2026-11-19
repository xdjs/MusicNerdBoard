import { timingSafeEqual } from "node:crypto";
import { findMember } from "@/lib/members/findMember";
import { sign } from "@/lib/session/sign";

/**
 * Who a session belongs to. The allowlist is checked again on every read, so
 * removing an email from it ends that member's sessions.
 *
 * @param token - The session cookie's value.
 * @param now - The current time, in milliseconds.
 * @returns The member's board name, or null for a missing, forged, expired or off-team session.
 */
export function readSession(token: string | undefined, now = Date.now()): string | null {
  const [payload, signature] = (token ?? "").split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  const { email, expires } = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
    email: string;
    expires: number;
  };
  return expires > now ? findMember(email) : null;
}
