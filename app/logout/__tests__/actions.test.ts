import { describe, expect, it, vi } from "vitest";
import { signOut } from "@/app/logout/actions";

const remove = vi.fn();
vi.mock("next/headers", () => ({ cookies: async () => ({ delete: remove }) }));

describe("signOut", () => {
  it("deletes this browser's board session cookie", async () => {
    await signOut();
    expect(remove).toHaveBeenCalledWith("mn_board_session");
  });
});
