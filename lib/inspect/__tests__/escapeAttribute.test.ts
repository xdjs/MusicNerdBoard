import { describe, expect, it } from "vitest";
import { escapeAttribute } from "@/lib/inspect/escapeAttribute";

describe("escapeAttribute", () => {
  it("escapes the characters that would end or break the attribute", () => {
    expect(escapeAttribute(`<a href="x">Tom & Jerry's</a>`)).toBe(
      "&#60;a href=&#34;x&#34;&#62;Tom &#38; Jerry&#39;s&#60;/a&#62;",
    );
  });

  it("leaves plain text alone", () => {
    expect(escapeAttribute("carl")).toBe("carl");
  });
});
