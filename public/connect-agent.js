// Puts "Connect your agent" in the header of the board's Settings page, which @vercel/board's
// inspector offers no slot for. Clicking it copies the prompt the login page copies, which the
// app hands this script in data-prompt, and says "Copied" for two seconds.
// Served from this origin, since the inspector's page allows only its own scripts.
(() => {
  const prompt = document.currentScript.dataset.prompt;
  const addTo = (header) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "act primary";
    button.dataset.connectAgent = "";
    button.title = "Copy a prompt that sets up Music Nerd in your agent";
    button.textContent = "Connect your agent";
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(prompt);
      } catch {
        return;
      }
      button.textContent = "Copied";
      setTimeout(() => (button.textContent = "Connect your agent"), 2000);
    });
    header.append(button);
  };
  const isSettings = (header) => header.querySelector(".title")?.textContent === "settings";
  new MutationObserver(() => {
    for (const header of document.querySelectorAll(".header:not(:has([data-connect-agent]))"))
      if (isSettings(header)) addTo(header);
  }).observe(document.body, { childList: true, subtree: true });
})();
