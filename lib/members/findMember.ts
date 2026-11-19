import { parseMembers } from "@/lib/members/parseMembers";

/**
 * The team member an email belongs to, from `BOARD_ALLOWED_EMAILS`.
 *
 * @param email - The signed-in email.
 * @returns The member's board name, or null when the email isn't on the team.
 */
export function findMember(email: string): string | null {
  return parseMembers(process.env.BOARD_ALLOWED_EMAILS).get(email.toLowerCase()) ?? null;
}
