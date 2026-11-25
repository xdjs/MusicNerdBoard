/**
 * Escapes a value for an HTML attribute in double quotes.
 *
 * @param value - The text to put in the attribute.
 * @returns The text, with `& < > " '` as character references.
 */
export function escapeAttribute(value: string): string {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}
