import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { withMember } from "@/lib/inspect/withMember";
import { createSession } from "@/lib/session/createSession";

const ok = vi.fn(async (request: Request) =>
  Response.json({ profile: request.headers.get("x-board-profile") }),
);
const inspect = withMember(ok, "/board");
const cookie = () => `mn_board_session=${createSession("carl")}`;

describe("withMember", () => {
  beforeEach(() => {
    vi.stubEnv("BOARD_SESSION_SECRET", "test-secret");
    ok.mockClear();
  });
  afterEach(() => vi.unstubAllEnvs());

  it("sends a signed-out visitor on the page to /login", async () => {
    const response = await inspect(new Request("https://board.test/board"));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("https://board.test/login");
    expect(ok).not.toHaveBeenCalled();
  });

  it("refuses a signed-out call to the board's API", async () => {
    const response = await inspect(new Request("https://board.test/board/board/threads"));
    expect(response.status).toBe(401);
    expect(ok).not.toHaveBeenCalled();
  });

  it("writes as the signed-in member, whatever profile the page picked", async () => {
    const request = new Request("https://board.test/board/board/messages", {
      method: "POST",
      headers: { cookie: cookie(), "x-board-profile": "someone-else" },
      body: "{}",
    });
    const response = await inspect(request);
    expect(await response.json()).toEqual({ profile: "carl" });
  });

  it("passes the method and body through, even from a Request subclass like Next's", async () => {
    class SubRequest extends Request {}
    const echo = withMember(
      async (request) => Response.json({ method: request.method, body: await request.text() }),
      "/board",
    );
    const request = new SubRequest("https://board.test/board/board/messages", {
      method: "POST",
      headers: { cookie: cookie() },
      body: '{"text":"hi"}',
    });
    expect(await (await echo(request)).json()).toEqual({ method: "POST", body: '{"text":"hi"}' });
  });
  it("serves the page to a member already signed in as them", async () => {
    const page = withMember(
      async () =>
        new Response('<meta name="inspect-profile" content="null">\n<meta name="inspect-named" content="1">\n', {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      "/board",
    );
    const response = await page(new Request("https://board.test/board", { headers: { cookie: cookie() } }));
    const html = await response.text();
    expect(html).not.toContain("inspect-named");
    expect(html).toContain('content="{&#34;name&#34;:&#34;carl&#34;}"');
    expect(response.headers.get("content-type")).toContain("text/html");
  });

  it("leaves the board's API responses alone", async () => {
    const response = await inspect(
      new Request("https://board.test/board/board/threads", { headers: { cookie: cookie() } }),
    );
    expect(await response.json()).toEqual({ profile: "carl" });
  });
});
