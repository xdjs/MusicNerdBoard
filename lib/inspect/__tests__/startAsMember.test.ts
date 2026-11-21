import { describe, expect, it } from "vitest";
import { startAsMember } from "@/lib/inspect/startAsMember";

const page = `<!doctype html>
<head>
<meta name="inspect-token" content="t">
<meta name="inspect-profile" content="null">
<meta name="inspect-base" content="/board">
<meta name="inspect-named" content="1">
<title>board</title>`;

const meta = (html: string, name: string) =>
  html.match(new RegExp(`<meta name="${name}" content="([^"]*)">`))?.[1];

describe("startAsMember", () => {
  it("starts the page as the member, so it doesn't ask who's posting", () => {
    const html = startAsMember(page, "carl");
    expect(meta(html, "inspect-named")).toBeUndefined();
    expect(meta(html, "inspect-profile")).toBe("{&#34;name&#34;:&#34;carl&#34;}");
  });

  it("escapes the name for the attribute", () => {
    const html = startAsMember(page, `a"<b>`);
    expect(meta(html, "inspect-profile")).toBe(
      "{&#34;name&#34;:&#34;a\\&#34;&#60;b&#62;&#34;}",
    );
  });

  it("leaves the rest of the page alone", () => {
    const html = startAsMember(page, "carl");
    expect(meta(html, "inspect-token")).toBe("t");
    expect(meta(html, "inspect-base")).toBe("/board");
  });
});
