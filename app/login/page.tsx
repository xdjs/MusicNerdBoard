import SignInWithPrivy from "@/components/SignInWithPrivy";

export const dynamic = "force-dynamic";

/** The board's sign-in page, for the team's allowlisted emails. */
export default function LoginPage() {
  return <SignInWithPrivy appId={process.env.PRIVY_APP_ID ?? ""} />;
}
