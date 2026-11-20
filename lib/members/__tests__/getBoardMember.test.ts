import { afterEach, describe, expect, it, vi } from "vitest";
import { getBoardMember } from "@/lib/members/getBoardMember";

const respond = (status: number, body: unknown) =>
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(Response.json(body, { status }));

afterEach(() => vi.restoreAllMocks());

describe("getBoardMember", () => {
  it("asks MusicNerdAPI's team check with the Privy access token", async () => {
    const fetch = respond(200, { status: "ok", name: "sweetman" });
    expect(await getBoardMember("token")).toEqual({ name: "sweetman" });
    const [url, init] = fetch.mock.calls[0];
    expect(String(url)).toMatch(/\/api\/board\/member$/);
    expect(new Headers(init?.headers).get("authorization")).toBe("Bearer token");
  });

  it("passes on the API's refusal", async () => {
    respond(403, { status: "error", error: "Not on the team" });
    expect(await getBoardMember("token")).toEqual({ error: "Not on the team", status: 403 });
  });

  it("is a 502 when the API can't be read", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("down"));
    expect(await getBoardMember("token")).toEqual({ error: "Couldn't reach Music Nerd", status: 502 });
  });
});
