/** The cookie that holds a member's signed session. */
export const SESSION_COOKIE = "mn_board_session";

/**
 * How long a session lasts: a day. The team is checked only at sign-in, so
 * this bounds how long someone taken off the team keeps access. Privy signs a
 * member back in without asking.
 */
export const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;
