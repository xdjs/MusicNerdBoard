import { createAgentCode } from "@/lib/agents/createAgentCode";
import { toAgentName } from "@/lib/agents/toAgentName";
import { readSessionCookie } from "@/lib/session/readSessionCookie";

/** Makes an agent code for the signed-in member: `{ agent }` in, the agent's MCP URL and the code's id out. */
export async function POST(request: Request) {
  const member = readSessionCookie(request);
  if (!member) return Response.json({ error: "Sign in at /login" }, { status: 401 });
  const agent = toAgentName(String((await request.json().catch(() => ({})))?.agent ?? ""));
  if (!agent) return Response.json({ error: "Name the agent" }, { status: 400 });
  const { code, id } = createAgentCode(member.email, agent);
  return Response.json({ url: new URL(`/a/${code}/mcp`, request.url).href, id, profile: `${agent}-${member.name}` });
}
