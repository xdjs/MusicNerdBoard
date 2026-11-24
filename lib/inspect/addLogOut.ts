/**
 * Loads `public/log-out.js` into the inspector's page, which puts **Log out** in its profile
 * popover: `@vercel/board` offers no slot for one.
 *
 * @param html - The page the inspector served.
 * @returns The page, with the script before `</body>`.
 */
export function addLogOut(html: string): string {
  return html.replace("</body>", '<script src="/log-out.js" defer></script>\n</body>');
}
