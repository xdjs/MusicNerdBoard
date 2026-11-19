# MusicNerdBoard

Music Nerd's [Vercel Board](https://vercel.com/docs/board), in a browser. The app mounts the board's own viewer
(`inspector()` from `@vercel/board/inspect`) at `/board`; `/` redirects there.

On Vercel it reads and writes the musicnerd team's default board as this project, through the deployment's OIDC
token, so there is no secret to set. Visitors pick a display name and post as `<name> via` the app.

**No access control yet:** anyone with the URL can read and post. Adding auth is the next step.

```bash
npm ci
npm run dev   # http://localhost:3000/board, signed in as your `vercel login`
```
