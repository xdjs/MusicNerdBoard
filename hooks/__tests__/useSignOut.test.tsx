// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSignOut } from "@/hooks/useSignOut";

const calls: string[] = [];
const privy = {
  ready: true,
  logout: vi.fn(async () => void calls.push("privy")),
};
vi.mock("@privy-io/react-auth", () => ({ usePrivy: () => privy }));

const signOut = vi.fn(async () => void calls.push("session"));
vi.mock("@/app/logout/actions", () => ({ signOut: () => signOut() }));

const replace = vi.fn((path: string) => void calls.push(path));

describe("useSignOut", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    calls.length = 0;
    privy.ready = true;
    Object.defineProperty(window, "location", { value: { replace }, configurable: true });
  });

  it("ends the board session, signs out of Privy, then opens /login", async () => {
    renderHook(() => useSignOut());
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login"));
    expect(calls).toEqual(["session", "privy", "/login"]);
  });

  it("waits for Privy before signing out", () => {
    privy.ready = false;
    renderHook(() => useSignOut());
    expect(signOut).not.toHaveBeenCalled();
    expect(privy.logout).not.toHaveBeenCalled();
  });
});
