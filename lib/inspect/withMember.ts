import { readSessionCookie } from "@/lib/session/readSessionCookie";
import { startAsMember } from "@/lib/inspect/startAsMember";

type Handler = (request: Request) => Promise<Response>;

/**
 * Lets only signed-in team members reach the inspector, and makes every write
 * theirs: the profile the page picks is replaced by the member's name, and the
 * page starts as them instead of asking who's posting.
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
    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const response = await handler(
      new Request(request.url, {
        method: request.method,
        headers,
        body: hasBody ? await request.arrayBuffer() : undefined,
      }),
    );
    if (!response.headers.get("content-type")?.startsWith("text/html")) return response;
    const page = startAsMember(await response.text(), member.name);
    const pageHeaders = new Headers(response.headers);
    pageHeaders.delete("content-length");
    return new Response(page, { status: response.status, headers: pageHeaders });
  };
}
