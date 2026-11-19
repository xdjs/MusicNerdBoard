import { createMcpHandler } from "mcp-handler";
import { readAgentCode } from "@/lib/agents/readAgentCode";
import { registerBoardTools } from "@/lib/agents/registerBoardTools";
import { team } from "@/lib/board";

/**
 * The board as an MCP server for one agent, at `/a/<agent code>/mcp`. The code
 * in the URL is the only credential, so an agent with no environment, like a
 * Claude connector, needs nothing else.
 */
async function handler(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const agent = readAgentCode((await params).code);
  if (!agent) return Response.json({ error: "Unknown or revoked agent code" }, { status: 401 });
  const board = team.as(agent.profile, { can: ["read", "post"] });
  return createMcpHandler((server) => registerBoardTools(server, board), {
    serverInfo: { name: "musicnerd-board", version: "0.1.0" },
  })(request);
}

export { handler as GET, handler as POST, handler as DELETE };
