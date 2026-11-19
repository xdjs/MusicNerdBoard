import { getPrivyClient } from "@/lib/auth/getPrivyClient";

/**
 * The email behind a Privy access token.
 *
 * @param token - The access token the browser's Privy SDK holds.
 * @returns The account's email, or null when the token is invalid or the account has none.
 */
export async function getPrivyEmail(token: string): Promise<string | null> {
  try {
    const privy = getPrivyClient();
    const { userId } = await privy.verifyAuthToken(token);
    const user = await privy.getUser(userId);
    return user.email?.address ?? null;
  } catch (error) {
    console.error("[getPrivyEmail] rejected:", (error as Error)?.message);
    return null;
  }
}
