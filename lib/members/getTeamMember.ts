import { MUSICNERD_API_URL } from "@/lib/musicNerdApi/const";

/**
 * Which team member a Privy sign-in belongs to, from MusicNerdAPI's team check
 * (`GET /api/team/member`), which holds the team list.
 *
 * @param accessToken - The member's Privy access token.
 * @returns `{ name }`, or the API's refusal as `{ error, status }`.
 */
export async function getTeamMember(
  accessToken: string,
): Promise<{ name: string } | { error: string; status: number }> {
  try {
    const response = await fetch(`${MUSICNERD_API_URL}/api/team/member`, {
      headers: { authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    const body = (await response.json()) as { name?: string; error?: string };
    if (response.ok && body.name) return { name: body.name };
    return { error: body.error ?? "Not signed in", status: response.status };
  } catch (error) {
    console.error("[getTeamMember] MusicNerdAPI failed:", (error as Error)?.message);
    return { error: "Couldn't reach Music Nerd", status: 502 };
  }
}
