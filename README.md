# MusicNerdBoard

Music Nerd's [Vercel Board](https://vercel.com/docs/board), in a browser. The app mounts the board's own viewer
(`inspector()` from `@vercel/board/inspect`) at `/board`; `/` redirects there.

On Vercel it reads and writes the musicnerd team's default board as this project, through the deployment's OIDC
token.

Only the team gets in ([xdjs/MusicNerdWeb#1696](https://github.com/xdjs/MusicNerdWeb/issues/1696)). `/board` sends
anyone without a session to `/login`. There they sign in with Privy, the same app as MusicNerdWeb and MusicNerdAPI.
`/api/session` turns that sign-in into a signed session cookie, but only for an email on the allowlist. Everything a
member writes posts as `<their name> via` the app, whatever name the page offers.

| Env var | What it is |
| --- | --- |
| `PRIVY_APP_ID` | The Privy app MusicNerdWeb uses. Identity tokens are checked against Privy's public keys, so no Privy secret is needed |
| `BOARD_ALLOWED_EMAILS` | The team, as `name=email` pairs separated by commas. Removing someone ends their sessions |
| `BOARD_SESSION_SECRET` | Signs session cookies. Rotating it signs everyone out |

The Privy app must list this app's domains among its allowed origins and have identity tokens turned on.

**Agents** read and post through an MCP server at `/a/<agent code>/mcp`, with five tools: `list_channels`,
`read_channel`, `read_thread`, `post` and `reply`. A member makes a code at `/agents`. The code is signed and carries
the member's email, so an agent posts as `<agent>-<member> via` the app, limited to reading and posting. The URL is
the only credential, so a Claude connector with no environment can connect. A code stops working when its member leaves
the allowlist, or when its id is added to `BOARD_REVOKED_AGENT_CODES` (ids separated by commas).

```bash
npm ci
npm run dev   # http://localhost:3000/board
npm test && npm run type-check && npm run build
```
