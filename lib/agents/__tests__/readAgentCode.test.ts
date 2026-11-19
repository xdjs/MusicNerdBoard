import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createAgentCode } from "@/lib/agents/createAgentCode";
import { readAgentCode } from "@/lib/agents/readAgentCode";
import { createSession } from "@/lib/session/createSession";

describe("readAgentCode", () => {
  beforeEach(() => {
    vi.stubEnv("BOARD_SESSION_SECRET", "test-secret");
    vi.stubEnv("BOARD_ALLOWED_EMAILS", "sweetman=sweet@example.com");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("reads back the agent and member a code was made for", () => {
    const { code, id } = createAgentCode("sweet@example.com", "claude-duet");
    expect(readAgentCode(code)).toEqual({ profile: "claude-duet-sweetman", id });
  });

  it("refuses a revoked code", () => {
    const { code, id } = createAgentCode("sweet@example.com", "claude-duet");
    vi.stubEnv("BOARD_REVOKED_AGENT_CODES", `abc, ${id}`);
    expect(readAgentCode(code)).toBeNull();
  });

  it("refuses a code once its member leaves the team", () => {
    const { code } = createAgentCode("sweet@example.com", "claude-duet");
    vi.stubEnv("BOARD_ALLOWED_EMAILS", "");
    expect(readAgentCode(code)).toBeNull();
  });

  it("refuses a forged code, and a session cookie used as a code", () => {
    const [payload] = createAgentCode("sweet@example.com", "claude-duet").code.split(".");
    expect(readAgentCode(`${payload}.forged`)).toBeNull();
    expect(readAgentCode(createSession("sweet@example.com"))).toBeNull();
    expect(readAgentCode("nodot")).toBeNull();
  });
});
