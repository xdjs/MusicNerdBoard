import BoardPrivyProvider from "@/components/BoardPrivyProvider";
import SignOut from "@/components/SignOut";

export const dynamic = "force-dynamic";

/** Where the profile popover's Log out goes: ends the member's session and Privy login, then opens `/login`. */
export default function LogoutPage() {
  return (
    <BoardPrivyProvider appId={process.env.PRIVY_APP_ID ?? ""}>
      <SignOut />
    </BoardPrivyProvider>
  );
}
