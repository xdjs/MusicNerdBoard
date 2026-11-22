// @vitest-environment jsdom
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSignIn } from "@/hooks/useSignIn";

const privy = {
  ready: true,
  authenticated: true,
  user: { email: { address: "member@example.com" } },
  login: vi.fn(),
  logout: vi.fn().mockResolvedValue(undefined),
  getAccessToken: vi.fn().mockResolvedValue("token"),
};
vi.mock("@privy-io/react-auth", () => ({ usePrivy: () => privy }));

const signIn = vi.fn();
vi.mock("@/app/login/actions", () => ({ signIn: (token: string) => signIn(token) }));

const assign = vi.fn();

describe("useSignIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    privy.authenticated = true;
    Object.defineProperty(window, "location", { value: { assign }, configurable: true });
  });

  it("opens the board once the team check passes", async () => {
    signIn.mockResolvedValue({ ok: true });
    renderHook(() => useSignIn());
    await waitFor(() => expect(assign).toHaveBeenCalledWith("/board"));
    expect(signIn).toHaveBeenCalledWith("token");
    expect(privy.logout).not.toHaveBeenCalled();
  });

  it("refuses an email that isn't on the team and signs it out", async () => {
    signIn.mockResolvedValue({ error: "Not on the team", status: 403 });
    const { result } = renderHook(() => useSignIn());
    await waitFor(() => expect(result.current.refused).toEqual({ email: "member@example.com" }));
    expect(result.current.error).toBeNull();
    expect(privy.logout).toHaveBeenCalled();
  });

  it("shows any other failure and signs out", async () => {
    signIn.mockResolvedValue({ error: "Team check failed", status: 502 });
    const { result } = renderHook(() => useSignIn());
    await waitFor(() => expect(result.current.error).toBe("Team check failed"));
    expect(result.current.refused).toBeNull();
    expect(privy.logout).toHaveBeenCalled();
  });

  it("does nothing until the member has logged in with Privy", () => {
    privy.authenticated = false;
    renderHook(() => useSignIn());
    expect(privy.getAccessToken).not.toHaveBeenCalled();
  });

  it("clears the last failure and opens Privy's login", async () => {
    signIn.mockResolvedValue({ error: "Not on the team", status: 403 });
    const { result } = renderHook(() => useSignIn());
    await waitFor(() => expect(result.current.refused).not.toBeNull());
    act(() => result.current.startLogin());
    expect(result.current.refused).toBeNull();
    expect(result.current.error).toBeNull();
    expect(privy.login).toHaveBeenCalled();
  });
});
