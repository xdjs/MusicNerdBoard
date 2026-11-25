// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const script = readFileSync(join(process.cwd(), "public/connect-agent.js"), "utf8");
const writeText = vi.fn();
const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

const header = (title: string) => {
  const bar = document.createElement("header");
  bar.className = "header flat";
  bar.innerHTML = `<span class="title">${title}</span><span class="spacer"></span>`;
  document.body.append(bar);
  return bar;
};

describe("public/connect-agent.js", () => {
  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const tag = document.createElement("script");
    tag.dataset.prompt = "the prompt";
    Object.defineProperty(document, "currentScript", { value: tag, configurable: true });
    new Function(script)();
  });
  // jsdom's teardown would wake the observer after `document` is gone: detach what it watches.
  afterAll(() => document.body.replaceWith(document.createElement("body")));
  beforeEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
    writeText.mockReset().mockResolvedValue(undefined);
  });

  it("adds Connect your agent to the Settings page's header when it opens", async () => {
    const bar = header("settings");
    await settle();
    const button = bar.querySelector<HTMLButtonElement>("[data-connect-agent]")!;
    expect(button.textContent).toBe("Connect your agent");
    expect(bar.lastElementChild).toBe(button);
  });

  it("copies the prompt it was handed and says so for two seconds", async () => {
    const bar = header("settings");
    await settle();
    vi.useFakeTimers();
    const button = bar.querySelector<HTMLButtonElement>("[data-connect-agent]")!;
    button.click();
    await vi.waitFor(() => expect(button.textContent).toBe("Copied"));
    expect(writeText).toHaveBeenCalledWith("the prompt");
    vi.advanceTimersByTime(2000);
    expect(button.textContent).toBe("Connect your agent");
  });

  it("doesn't say Copied when the clipboard refuses", async () => {
    writeText.mockRejectedValue(new Error("denied"));
    const bar = header("settings");
    await settle();
    const button = bar.querySelector<HTMLButtonElement>("[data-connect-agent]")!;
    button.click();
    await settle();
    expect(button.textContent).toBe("Connect your agent");
  });

  it("adds it once, however often the page changes", async () => {
    const bar = header("settings");
    await settle();
    bar.append(document.createElement("span"));
    await settle();
    expect(bar.querySelectorAll("[data-connect-agent]")).toHaveLength(1);
  });

  it("leaves the other pages' headers alone", async () => {
    const bar = header("tasks");
    await settle();
    expect(bar.querySelector("[data-connect-agent]")).toBeNull();
  });
});
