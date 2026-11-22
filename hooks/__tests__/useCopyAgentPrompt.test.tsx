// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCopyAgentPrompt } from "@/hooks/useCopyAgentPrompt";

const copyAgentPrompt = vi.fn();
vi.mock("@/lib/mcp/copyAgentPrompt", () => ({ copyAgentPrompt: () => copyAgentPrompt() }));

describe("useCopyAgentPrompt", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("says copied for two seconds after copying the prompt", async () => {
    copyAgentPrompt.mockResolvedValue(true);
    const { result } = renderHook(() => useCopyAgentPrompt());
    await act(() => result.current.copy());
    expect(result.current.copied).toBe(true);
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.copied).toBe(false);
  });

  it("doesn't say copied when the browser won't copy", async () => {
    copyAgentPrompt.mockResolvedValue(false);
    const { result } = renderHook(() => useCopyAgentPrompt());
    await act(() => result.current.copy());
    expect(result.current.copied).toBe(false);
  });
});
