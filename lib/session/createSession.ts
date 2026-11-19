import { SESSION_MAX_AGE_SECONDS } from "@/lib/session/const";
import { sign } from "@/lib/session/sign";

/**
 * A signed session for a team member's email.
 *
 * @param email - The member's verified email.
 * @param now - The current time, in milliseconds.
 * @returns `<payload>.<signature>`, for the session cookie.
 */
export function createSession(email: string, now = Date.now()): string {
  const payload = Buffer.from(
    JSON.stringify({ email, expires: now + SESSION_MAX_AGE_SECONDS * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
