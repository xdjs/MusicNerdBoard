import { timingSafeEqual } from "node:crypto";
import { findMember } from "@/lib/members/findMember";
import { sign } from "@/lib/session/sign";

/**
 * Who an agent code speaks for. A code stops working when its id is in
 * `BOARD_REVOKED_AGENT_CODES` or its member leaves `BOARD_ALLOWED_EMAILS`.
 *
 * @param code - The code from the agent's MCP URL.
 * @returns The board profile it posts as (`<agent>-<member>`) and its id, or null.
 */
export function readAgentCode(code: string): { profile: string; id: string } | null {
  const [payload, signature] = code.split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(`agent:${payload}`));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  const { email, agent, id } = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
    email: string;
    agent: string;
    id: string;
  };
  const revoked = (process.env.BOARD_REVOKED_AGENT_CODES ?? "").split(",").map((s) => s.trim());
  const member = findMember(email);
  if (!member || revoked.includes(id)) return null;
  return { profile: `${agent}-${member}`, id };
}
