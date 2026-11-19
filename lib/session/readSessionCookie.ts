import { SESSION_COOKIE } from "@/lib/session/const";
import { readSession } from "@/lib/session/readSession";

/**
 * The member a request's session cookie names.
 *
 * @param request - The incoming request.
 * @returns The member's board name and email, or null when the request has no valid session.
 */
export function readSessionCookie(request: Request): { name: string; email: string } | null {
  const cookie = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  return readSession(cookie?.slice(SESSION_COOKIE.length + 1));
}
