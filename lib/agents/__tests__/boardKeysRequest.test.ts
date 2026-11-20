import { afterEach, describe, expect, it, vi } from "vitest";
import { boardKeysRequest } from "@/lib/agents/boardKeysRequest";

afterEach(() => vi.restoreAllMocks());

describe("boardKeysRequest", () => {
  it("calls MusicNerdAPI's board keys with the member's access token", async () => {
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(Response.json({ status: "ok", keys: [] }));
    expect(await boardKeysRequest("token", "", { method: "GET" })).toEqual({ status: "ok", keys: [] });
    const [url, init] = fetch.mock.calls[0];
    expect(String(url)).toMatch(/\/api\/board\/keys$/);
    expect(new Headers(init?.headers).get("authorization")).toBe("Bearer token");
  });

  it("sends a body as JSON to a sub-path", async () => {
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(Response.json({ status: "ok" }));
    await boardKeysRequest("token", "/k1/revoke", { method: "POST", body: {} });
    const [url, init] = fetch.mock.calls[0];
    expect(String(url)).toMatch(/\/api\/board\/keys\/k1\/revoke$/);
    expect(init?.body).toBe("{}");
    expect(new Headers(init?.headers).get("content-type")).toBe("application/json");
  });

  it("throws the API's error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      Response.json({ status: "error", error: "Not on the team" }, { status: 403 }),
    );
    await expect(boardKeysRequest("token", "", { method: "GET" })).rejects.toThrow("Not on the team");
  });
});
