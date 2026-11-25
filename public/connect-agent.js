// Puts the login page's "Connect your agent" on the board's Settings page, between "you" and "explain",
// which @vercel/board's inspector offers no slot for. The button and its styles come from the app's
// /connect-agent page, the prompt from data-prompt; clicking copies the prompt and says "Copied" for
// two seconds. Served from this origin, since the inspector's page allows only its own scripts.
(() => {
  const prompt = document.currentScript.dataset.prompt;
  const connectAgent = fetch("/connect-agent")
    .then((response) => response.text())
    .then((html) => {
      const page = new DOMParser().parseFromString(html, "text/html").getElementById("connect-agent");
      document.head.append(page.querySelector("style"));
      return page.querySelector("[data-connect-agent]");
    });
  const addBefore = (heading, template) => {
    const row = document.createElement("div");
    row.className = "connect-agent-row";
    row.style.padding = "12px 20px 0";
    const button = template.cloneNode(true);
    const label = button.querySelector("[aria-live]");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(prompt);
      } catch {
        return;
      }
      button.dataset.copied = "";
      label.textContent = "Copied";
      setTimeout(() => {
        delete button.dataset.copied;
        label.textContent = "Connect your agent";
      }, 2000);
    });
    row.append(button);
    heading.before(row);
  };
  const isExplain = (heading) =>
    heading.textContent === "explain" && !heading.previousElementSibling?.matches(".connect-agent-row");
  connectAgent.then((template) => {
    const add = () => {
      for (const heading of document.querySelectorAll("h3")) if (isExplain(heading)) addBefore(heading, template);
    };
    add();
    new MutationObserver(add).observe(document.body, { childList: true, subtree: true });
  });
})();
