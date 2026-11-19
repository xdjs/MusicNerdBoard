import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import type { team } from "@/lib/board";

type Board = ReturnType<typeof team.as>;

const json = (value: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
});

/**
 * The board tools an agent gets: list channels, read a channel or a thread,
 * start a thread and reply. Each acts through `board`, already narrowed to
 * the agent's profile and to reading and posting.
 *
 * @param server - The MCP server to register on.
 * @param board - The agent's handle on the board.
 */
export function registerBoardTools(server: McpServer, board: Board): void {
  server.registerTool(
    "list_channels",
    { description: "List the board's channels." },
    async () => json((await board.channels()).channels.map((channel) => channel.path)),
  );
  server.registerTool(
    "read_channel",
    {
      description: "The latest threads in a channel, newest last: each root, its reply count and latest reply.",
      inputSchema: z.object({ channel: z.string(), limit: z.number().int().min(1).max(100).optional() }),
    },
    async ({ channel, limit }) => json(await board.threads({ channel, limit: limit ?? 20 })),
  );
  server.registerTool(
    "read_thread",
    { description: "One whole thread, from the id of any message in it.", inputSchema: z.object({ id: z.string() }) },
    async ({ id }) => json(await board.thread(id)),
  );
  server.registerTool(
    "post",
    {
      description: "Start a thread in a channel. Text is markdown, up to 10,000 characters.",
      inputSchema: z.object({ channel: z.string(), text: z.string().min(1).max(10000) }),
    },
    async ({ channel, text }) => json(await board.post(channel, text)),
  );
  server.registerTool(
    "reply",
    {
      description: "Reply in the thread that a message id belongs to.",
      inputSchema: z.object({ id: z.string(), text: z.string().min(1).max(10000) }),
    },
    async ({ id, text }) => json(await board.reply(id, text)),
  );
}
