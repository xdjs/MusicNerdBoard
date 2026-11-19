import { createLocalJWKSet, exportJWK, generateKeyPair, SignJWT } from "jose";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { getPrivyEmail } from "@/lib/auth/getPrivyEmail";

let keys: ReturnType<typeof createLocalJWKSet>;
let privateKey: CryptoKey;

const identityToken = (claims: Record<string, unknown>, audience = "app-1") =>
  new SignJWT(claims)
    .setProtectedHeader({ alg: "ES256" })
    .setIssuer("privy.io")
    .setAudience(audience)
    .setExpirationTime("1h")
    .sign(privateKey);

describe("getPrivyEmail", () => {
  beforeAll(async () => {
    const pair = await generateKeyPair("ES256");
    privateKey = pair.privateKey;
    keys = createLocalJWKSet({ keys: [{ ...(await exportJWK(pair.publicKey)), alg: "ES256" }] });
  });
  beforeEach(() => {
    vi.stubEnv("PRIVY_APP_ID", "app-1");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => vi.unstubAllEnvs());

  it("reads the email from a valid identity token", async () => {
    const token = await identityToken({
      linked_accounts: JSON.stringify([{ type: "wallet" }, { type: "email", address: "pete@example.com" }]),
    });
    expect(await getPrivyEmail(token, keys)).toBe("pete@example.com");
  });

  it("returns null for an account with no email", async () => {
    const token = await identityToken({ linked_accounts: JSON.stringify([{ type: "wallet" }]) });
    expect(await getPrivyEmail(token, keys)).toBeNull();
  });

  it("refuses a token made for another Privy app", async () => {
    const token = await identityToken({ linked_accounts: "[]" }, "another-app");
    expect(await getPrivyEmail(token, keys)).toBeNull();
  });

  it("refuses a token that isn't one", async () => {
    expect(await getPrivyEmail("not.a.token", keys)).toBeNull();
  });
});
