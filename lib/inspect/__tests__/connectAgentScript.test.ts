// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { createElement } from "react";
import ConnectAgentPage from "@/app/connect-agent/page";

const script = readFileSync(join(process.cwd(), "public/connect-agent.js"), "utf8");
const writeText = vi.fn();
const fetchPage = vi.fn();
const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

// The Settings page's access section, as @vercel/board's inspector draws it.
const settings = () => {
  const page = document.createElement("div");
  page.className = "page";
  page.innerHTML = `<h3>you</h3><div class="grant-row"></div><h3>explain</h3><form class="explain"></form>`;
  document.body.append(page);
  return page;
};

describe("public/connect-agent.js", () => {
  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const { container, unmount } = render(createElement(ConnectAgentPage));
    const page = `<html><body>${container.innerHTML}</body></html>`;
    unmount();
    fetchPage.mockImplementation(async (url) => new Response(url === "/connect-agent" ? page : "", { status: url === "/connect-agent" ? 200 : 404 }));
    vi.stubGlobal("fetch", fetchPage);
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

  it("puts the login page's Connect your agent between you and explain", async () => {
    const page = settings();
    await settle();
    const button = page.querySelector<HTMLButtonElement>("[data-connect-agent]")!;
    expect(button.className).toBe("connect-agent");
    expect(button.textContent).toBe("Connect your agent");
    expect(button.closest(".connect-agent-row")!.previousElementSibling!.className).toBe("grant-row");
    expect(button.closest(".connect-agent-row")!.nextElementSibling!.textContent).toBe("explain");
    expect(document.head.querySelector("style")!.textContent).toContain(".connect-agent {");
  });

  it("copies the prompt it was handed and says so for two seconds", async () => {
    const page = settings();
    await settle();
    vi.useFakeTimers();
    const button = page.querySelector<HTMLButtonElement>("[data-connect-agent]")!;
    button.click();
    await vi.waitFor(() => expect(button.textContent).toBe("Copied"));
    expect(writeText).toHaveBeenCalledWith("the prompt");
    expect(button.dataset.copied).toBe("");
    vi.advanceTimersByTime(2000);
    expect(button.textContent).toBe("Connect your agent");
    expect(button.dataset.copied).toBeUndefined();
  });

  it("doesn't say Copied when the clipboard refuses", async () => {
    writeText.mockRejectedValue(new Error("denied"));
    const page = settings();
    await settle();
    const button = page.querySelector<HTMLButtonElement>("[data-connect-agent]")!;
    button.click();
    await settle();
    expect(button.textContent).toBe("Connect your agent");
  });

  it("adds it once, however often the page changes", async () => {
    const page = settings();
    await settle();
    page.append(document.createElement("span"));
    await settle();
    expect(page.querySelectorAll("[data-connect-agent]")).toHaveLength(1);
  });

  it("leaves pages without explain alone", async () => {
    const page = document.createElement("div");
    page.innerHTML = `<h3>grants</h3>`;
    document.body.append(page);
    await settle();
    expect(page.querySelector("[data-connect-agent]")).toBeNull();
  });
});
