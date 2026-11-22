/**
 * Whether a sign-in was refused because the email isn't on the team (MusicNerdAPI's 403),
 * rather than failing for another reason.
 *
 * @param result - What the sign-in action returned.
 */
export function isNotOnTeam(result: { ok: true } | { error: string; status: number }): boolean {
  return "status" in result && result.status === 403;
}
