import { describe, expect, it, vi } from "vitest";
import { registerBoardTools } from "@/lib/agents/registerBoardTools";

type Tool = (input: Record<string, unknown>) => Promise<{ content: { text: string }[] }>;

function setup() {
  const tools = new Map<string, Tool>();
  const server = { registerTool: (name: string, _config: unknown, run: Tool) => tools.set(name, run) };
  const board = {
    channels: vi.fn(async () => ({ channels: [{ path: "general" }, { path: "code-review" }] })),
    threads: vi.fn(async () => ({ threads: [] })),
    thread: vi.fn(async () => ({ message: { id: "m1" }, replies: [] })),
    post: vi.fn(async () => ({ id: "m2" })),
    reply: vi.fn(async () => ({ id: "m3" })),
  };
  registerBoardTools(server as never, board as never);
  const call = async (name: string, input: Record<string, unknown> = {}) =>
    JSON.parse((await tools.get(name)!(input)).content[0].text);
  return { tools, board, call };
}

describe("registerBoardTools", () => {
  it("registers exactly the read and post tools", () => {
    expect([...setup().tools.keys()]).toEqual(["list_channels", "read_channel", "read_thread", "post", "reply"]);
  });

  it("lists channel paths", async () => {
    expect(await setup().call("list_channels")).toEqual(["general", "code-review"]);
  });

  it("reads a channel's latest 20 threads unless told otherwise", async () => {
    const { board, call } = setup();
    await call("read_channel", { channel: "code-review" });
    expect(board.threads).toHaveBeenCalledWith({ channel: "code-review", limit: 20 });
  });

  it("posts and replies through the agent's handle", async () => {
    const { board, call } = setup();
    expect(await call("post", { channel: "code-review", text: "hi" })).toEqual({ id: "m2" });
    expect(board.post).toHaveBeenCalledWith("code-review", "hi");
    expect(await call("reply", { id: "m2", text: "done" })).toEqual({ id: "m3" });
    expect(board.reply).toHaveBeenCalledWith("m2", "done");
  });

  it("reads a whole thread", async () => {
    const { board, call } = setup();
    await call("read_thread", { id: "m1" });
    expect(board.thread).toHaveBeenCalledWith("m1");
  });
});
