import { NextResponse } from "next/server";
import { getPrivyEmail } from "@/lib/auth/getPrivyEmail";
import { findMember } from "@/lib/members/findMember";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/session/const";
import { createSession } from "@/lib/session/createSession";

/** Signs a team member in: a Privy access token in `Authorization: Bearer` becomes a session cookie. */
export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const email = token ? await getPrivyEmail(token) : null;
  if (!email) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!findMember(email))
    return NextResponse.json({ error: "This board is for the Music Nerd team" }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSession(email), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

/** Signs out. */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
