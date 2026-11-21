const attribute = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/**
 * Starts the inspector's page as the signed-in member, so it skips its "Who's posting?" box:
 * it drops `inspect-named`, which makes the page ask, and sets `inspect-profile` to the member.
 *
 * @param html - The page the inspector served.
 * @param name - The member's name from their session.
 * @returns The page, starting as that member.
 */
export function startAsMember(html: string, name: string): string {
  return html
    .replace(/<meta name="inspect-named" content="1">\n?/, "")
    .replace(
      /<meta name="inspect-profile" content="[^"]*">/,
      () => `<meta name="inspect-profile" content="${attribute(JSON.stringify({ name }))}">`,
    );
}
