import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from "jose";

let privyKeys: JWTVerifyGetKey | null = null;

/**
 * The email in a Privy identity token. The token is checked against the public
 * keys Privy publishes for `PRIVY_APP_ID`, so no Privy secret is needed.
 *
 * @param token - The identity token the browser's Privy SDK holds.
 * @param keys - The keys to verify with; Privy's, unless a test passes its own.
 * @returns The account's email, or null when the token is invalid or has none.
 */
export async function getPrivyEmail(token: string, keys?: JWTVerifyGetKey): Promise<string | null> {
  const appId = process.env.PRIVY_APP_ID;
  if (!appId) throw new Error("PRIVY_APP_ID is not set");
  privyKeys ??= createRemoteJWKSet(new URL(`https://auth.privy.io/api/v1/apps/${appId}/jwks.json`));
  try {
    const { payload } = await jwtVerify(token, keys ?? privyKeys, {
      issuer: "privy.io",
      audience: appId,
      algorithms: ["ES256"],
    });
    const accounts = JSON.parse(String(payload.linked_accounts ?? "[]")) as { type: string; address?: string }[];
    return accounts.find((account) => account.type === "email")?.address ?? null;
  } catch (error) {
    console.error("[getPrivyEmail] rejected:", (error as Error)?.message);
    return null;
  }
}
