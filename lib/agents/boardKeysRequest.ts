import { MUSICNERD_API_URL } from "@/lib/musicNerdApi/const";

/**
 * Calls MusicNerdAPI's board keys endpoints as the signed-in member.
 *
 * @param accessToken - The member's Privy access token.
 * @param path - After `/api/board/keys`: `""` for the list, `/<id>/revoke` to revoke.
 * @param init - The method, and a body to send as JSON.
 * @param init.method - `GET` or `POST`.
 * @param init.body - The JSON body, if any.
 * @returns The API's JSON answer.
 * @throws With the API's error message when it refuses.
 */
export async function boardKeysRequest<T = Record<string, unknown>>(
  accessToken: string,
  path: string,
  init: { method: "GET" | "POST"; body?: unknown },
): Promise<T> {
  const response = await fetch(`${MUSICNERD_API_URL}/api/board/keys${path}`, {
    method: init.method,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(init.body === undefined ? {} : { "content-type": "application/json" }),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? `MusicNerdAPI answered ${response.status}`);
  return body;
}
