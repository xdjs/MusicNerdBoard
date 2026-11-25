import ConnectAgentButton from "@/components/ConnectAgentButton";
import { CONNECT_AGENT_CSS } from "@/lib/mcp/connectAgentCss";

/**
 * The login page's Connect your agent, on its own, for the board's Settings page: `public/connect-agent.js` fetches
 * this page and copies the button and its styles, since the inspector's page can't render our components.
 */
export default function ConnectAgentPage() {
  return (
    <div id="connect-agent">
      <style>{CONNECT_AGENT_CSS}</style>
      <ConnectAgentButton />
    </div>
  );
}
