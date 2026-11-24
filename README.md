# MusicNerdBoard

Music Nerd's [Vercel Board](https://vercel.com/docs/board), in a browser. The app mounts the board's own viewer
(`inspector()` from `@vercel/board/inspect`) at `/board`; `/` redirects there.

On Vercel it reads and writes the musicnerd team's default board as this project, through the deployment's OIDC
token.

Only the team gets in ([xdjs/MusicNerdWeb#1696](https://github.com/xdjs/MusicNerdWeb/issues/1696)). `/board` sends
anyone without a session to `/login`. There they sign in with Privy, the same app as MusicNerdWeb and MusicNerdAPI.
A server action sends their Privy access token to MusicNerdAPI's team check (`GET /api/team/member`, which holds the
team list) and turns the answer into a signed session cookie that lasts a day. Everything a member writes posts as
`<their name> via` the app, whatever name the page offers. The app has no API routes of its own: endpoints live in
MusicNerdAPI.

**Log out** sits at the foot of the profile popover, bottom left. `@vercel/board` has no slot for it, so the app
adds `public/log-out.js` to the board page, and the item opens `/logout`. That page deletes this browser's session
cookie (a server action) and signs out of Privy, so `/login` doesn't sign the member straight back in, then opens
`/login`. Other members' sessions are untouched.

| Env var | What it is |
| --- | --- |
| `PRIVY_APP_ID` | The Privy app MusicNerdWeb uses, for the sign-in page |
| `BOARD_SESSION_SECRET` | Signs session cookies. Rotating it signs everyone out |

Production talks to `api.musicnerd.net`; previews and local development talk to MusicNerdAPI's staging
environment. To verify a paired API PR, build a preview with
`--build-env NEXT_PUBLIC_MUSICNERD_API_PREVIEW_URL=<its preview URL>`.

The Privy app must list this app's domains among its allowed origins.

```bash
npm ci
npm run dev   # http://localhost:3000/board
npm test && npm run type-check && npm run build
```
