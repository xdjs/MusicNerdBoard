/** Music Nerd's MCP server, where team members connect their agents. */
export const MCP_URL = "https://api.musicnerd.net/mcp";

/** Where each agent's setup steps for the MCP server are documented. */
export const MCP_DOCS_URL = "https://docs.musicnerd.net/mcp";

/** What "Connect your agent" copies: a prompt that has the agent check for, or offer to set up, the MCP server. */
export const AGENT_PROMPT = `Check this agent's MCP servers for Music Nerd (${MCP_URL}). If it is connected, show me how to read the team board's channels with it. If it is added but not signed in, offer to sign in. If it is missing, explain how its artist data and team board tools let you look up artists and post to the team without copying anything by hand, and offer the setup steps for this agent from ${MCP_DOCS_URL}. If you can't check, say so. Don't sign in again or change anything without asking.`;
