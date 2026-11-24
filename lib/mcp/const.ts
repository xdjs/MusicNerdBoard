/** Music Nerd's MCP server, which the plugin connects. */
export const MCP_URL = "https://api.musicnerd.net/mcp";

/** Where each agent's install steps for the Music Nerd plugin are documented. */
export const PLUGIN_DOCS_URL = "https://docs.musicnerd.net/plugin";

/** What "Connect your agent" copies: a prompt that has the agent check for, enable or offer to install the Music Nerd plugin. */
export const AGENT_PROMPT = `Check this agent's plugin list for musicnerd (xdjs/MusicNerdSkills). If it is enabled, check that its MCP server (${MCP_URL}) is signed in, offer to sign in if it isn't, then show me how to read the team board's channels with it. If it is installed but disabled, offer to enable it. If it is missing, explain how its team skills and its artist data and team board tools let you ship Music Nerd work, look up artists and post to the team without copying anything by hand, and offer the installation steps for this agent from ${PLUGIN_DOCS_URL}. If you can't check, say so. Don't sign in again or change anything without asking.`;
