// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const script = readFileSync(join(process.cwd(), "public/log-out.js"), "utf8");
const assign = vi.fn();
const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

const menu = (...items: string[]) => {
  const popup = document.createElement("div");
  popup.className = "menu";
  popup.setAttribute("role", "menu");
  for (const text of items) {
    const item = document.createElement("div");
    item.className = "item";
    item.setAttribute("role", "menuitem");
    item.innerHTML = `<span class="grow">${text}</span>`;
    popup.append(item);
  }
  document.body.append(popup);
  return popup;
};

describe("public/log-out.js", () => {
  beforeAll(() => {
    Object.defineProperty(window, "location", { value: { assign }, configurable: true });
    new Function(script)();
  });
  // jsdom's teardown would wake the observer after `document` is gone: detach what it watches.
  afterAll(() => document.body.replaceWith(document.createElement("body")));
  beforeEach(() => {
    document.body.innerHTML = "";
    assign.mockClear();
  });

  it("adds Log out to the profile popover when it opens", async () => {
    const popup = menu("carl (you)", "claude", "another profile…");
    await settle();
    const items = popup.querySelectorAll('[role="menuitem"]');
    expect(items[items.length - 1].textContent).toBe("Log out");
    expect(popup.querySelectorAll(".separator")).toHaveLength(1);
  });

  it("opens /logout when Log out is picked", async () => {
    const popup = menu("another profile…");
    await settle();
    popup.querySelector<HTMLElement>("[data-log-out]")!.click();
    expect(assign).toHaveBeenCalledWith("/logout");
  });

  it("adds it once, however often the page changes", async () => {
    const popup = menu("another profile…");
    await settle();
    popup.append(document.createElement("span"));
    await settle();
    expect(popup.querySelectorAll("[data-log-out]")).toHaveLength(1);
  });

  it("leaves the page's other menus alone", async () => {
    const popup = menu("edit", "delete");
    await settle();
    expect(popup.querySelector("[data-log-out]")).toBeNull();
  });
});
