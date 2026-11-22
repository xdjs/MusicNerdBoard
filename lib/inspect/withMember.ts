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
 * @returns A handler that sends strangers on a page (any GET outside `${basePath}/board`, the
 *   inspector's API) home to `/`, which leads to `/login`; the page at `basePath` goes straight to
 *   `/login`, since `/` redirects back to it. Every other request gets a 401.
 */
export function withMember(handler: Handler, basePath: string): Handler {
  return async (request) => {
    const member = readSessionCookie(request);
    if (!member) {
      const path = new URL(request.url).pathname.replace(/\/+$/, "");
      const api = `${basePath}/board`;
      if (request.method === "GET" && path !== api && !path.startsWith(`${api}/`))
        return Response.redirect(new URL(path === basePath ? "/login" : "/", request.url), 302);
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
