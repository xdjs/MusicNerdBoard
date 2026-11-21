import { timingSafeEqual } from "node:crypto";
import { sign } from "@/lib/session/sign";

/**
 * Who a session belongs to.
 *
 * @param token - The session cookie's value.
 * @param now - The current time, in milliseconds.
 * @returns The member's board name, or null for a missing, forged or expired session.
 */
export function readSession(token: string | undefined, now = Date.now()): { name: string } | null {
  const [payload, signature] = (token ?? "").split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  const { name, expires } = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
    name: string;
    expires: number;
  };
  return expires > now ? { name } : null;
}
