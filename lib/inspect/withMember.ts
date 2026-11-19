import { readSessionCookie } from "@/lib/session/readSessionCookie";

type Handler = (request: Request) => Promise<Response>;

/**
 * Lets only signed-in team members reach the inspector, and makes every write
 * theirs: the profile the page picks is replaced by the member's name.
 *
 * @param handler - The inspector's handler.
 * @param basePath - Where the inspector is mounted, e.g. `/board`.
 * @returns A handler that sends strangers to `/login` (the page) or a 401 (everything else).
 */
export function withMember(handler: Handler, basePath: string): Handler {
  return async (request) => {
    const member = readSessionCookie(request);
    if (!member) {
      const { pathname } = new URL(request.url);
      if (request.method === "GET" && pathname.replace(/\/+$/, "") === basePath)
        return Response.redirect(new URL("/login", request.url), 302);
      return Response.json(
        { error: { code: "unauthorized", message: "sign in at /login" } },
        { status: 401 },
      );
    }
    const headers = new Headers(request.headers);
    headers.set("x-board-profile", member.name);
    return handler(new Request(request, { headers }));
  };
}
