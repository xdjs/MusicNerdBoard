/**
 * MusicNerdAPI, which holds the team list. Production talks to production;
 * previews and local development talk to MusicNerdAPI's `staging`
 * environment. A preview can point at a paired API PR's preview to verify it;
 * production never uses that override.
 */
export const MUSICNERD_API_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://api.musicnerd.net"
    : process.env.NEXT_PUBLIC_MUSICNERD_API_PREVIEW_URL?.trim().replace(/\/+$/, "") ||
      "https://musicnerd-api-staging.vercel.app";
