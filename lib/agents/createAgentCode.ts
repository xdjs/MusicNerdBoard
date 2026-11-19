import { randomBytes } from "node:crypto";
import { sign } from "@/lib/session/sign";

/**
 * A code that lets one agent read and post on the board for a team member.
 * It is signed, so it can't be forged, and carries an id, so it can be revoked.
 *
 * @param email - The member's email.
 * @param agent - The agent's name, from `toAgentName`.
 * @returns The code and its id.
 */
export function createAgentCode(email: string, agent: string): { code: string; id: string } {
  const id = randomBytes(6).toString("hex");
  const payload = Buffer.from(JSON.stringify({ email, agent, id })).toString("base64url");
  return { code: `${payload}.${sign(`agent:${payload}`)}`, id };
}
