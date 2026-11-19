import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { withMember } from "@/lib/inspect/withMember";
import { createSession } from "@/lib/session/createSession";

const ok = vi.fn(async (request: Request) =>
  Response.json({ profile: request.headers.get("x-board-profile") }),
);
const inspect = withMember(ok, "/board");
const cookie = () => `mn_board_session=${createSession("carl@example.com")}`;

describe("withMember", () => {
  beforeEach(() => {
    vi.stubEnv("BOARD_SESSION_SECRET", "test-secret");
    vi.stubEnv("BOARD_ALLOWED_EMAILS", "carl=carl@example.com");
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
});
