import { SESSION_MAX_AGE_SECONDS } from "@/lib/session/const";
import { sign } from "@/lib/session/sign";

/**
 * A signed session for a team member.
 *
 * @param name - The member's board name, from MusicNerdAPI's team check.
 * @param now - The current time, in milliseconds.
 * @returns `<payload>.<signature>`, for the session cookie.
 */
export function createSession(name: string, now = Date.now()): string {
  const payload = Buffer.from(
    JSON.stringify({ name, expires: now + SESSION_MAX_AGE_SECONDS * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
