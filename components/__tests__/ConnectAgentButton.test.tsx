// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ConnectAgentButton from "@/components/ConnectAgentButton";

describe("ConnectAgentButton", () => {
  afterEach(cleanup);

  it("offers to connect your agent", () => {
    const button = render(<ConnectAgentButton />).getByRole("button");
    expect(button.textContent).toBe("Connect your agent");
    expect(button.dataset.copied).toBeUndefined();
  });

  it("says Copied, and shows the tick, once the prompt is copied", () => {
    const button = render(<ConnectAgentButton copied />).getByRole("button");
    expect(button.textContent).toBe("Copied");
    expect(button.dataset.copied).toBe("");
  });
});
