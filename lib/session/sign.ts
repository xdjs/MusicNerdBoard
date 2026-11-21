import { createHmac } from "node:crypto";

/**
 * Signs text with `BOARD_SESSION_SECRET`.
 *
 * @param text - What to sign.
 * @returns The HMAC-SHA256 signature, base64url.
 */
export function sign(text: string): string {
  const secret = process.env.BOARD_SESSION_SECRET;
  if (!secret) throw new Error("BOARD_SESSION_SECRET is not set");
  return createHmac("sha256", secret).update(text).digest("base64url");
}
