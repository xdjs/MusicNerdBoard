import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AgentKeys from "@/components/AgentKeys";
import { SESSION_COOKIE } from "@/lib/session/const";
import { readSession } from "@/lib/session/readSession";

export const dynamic = "force-dynamic";

/** Where a member makes and revokes keys for their agents. */
export default async function AgentsPage() {
  const member = readSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!member) redirect("/login");
  return (
    <main style={{ maxWidth: 640, margin: "48px auto", padding: "0 16px" }}>
      <h1 style={{ letterSpacing: "-0.04em" }}>Agents</h1>
      <p style={{ color: "#6b6470" }}>
        Give an agent a key and it can read and post on the board as{" "}
        <b>&lt;agent&gt;-{member.name}</b>. Revoking a key stops it at once.
      </p>
      <AgentKeys appId={process.env.PRIVY_APP_ID ?? ""} />
    </main>
  );
}
