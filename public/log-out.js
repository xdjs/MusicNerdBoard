// Puts "Log out" at the foot of the board's profile popover, which @vercel/board's inspector
// offers no slot for. The popover is the menu with "another profile…" in it; picking Log out
// opens /logout, which ends the board session and the Privy login, then opens /login.
// Served from this origin, since the inspector's page allows only its own scripts.
(() => {
  const addTo = (menu) => {
    const separator = document.createElement("div");
    separator.className = "separator";
    separator.setAttribute("role", "separator");
    const item = document.createElement("div");
    item.className = "item";
    item.setAttribute("role", "menuitem");
    item.tabIndex = -1;
    item.dataset.logOut = "";
    item.innerHTML = '<span class="grow">Log out</span>';
    item.addEventListener("click", () => window.location.assign("/logout"));
    menu.append(separator, item);
  };
  const isProfileMenu = (menu) =>
    [...menu.querySelectorAll('[role="menuitem"]')].some((item) => item.textContent === "another profile…");
  new MutationObserver(() => {
    for (const menu of document.querySelectorAll(".menu:not(:has([data-log-out]))"))
      if (isProfileMenu(menu)) addTo(menu);
  }).observe(document.body, { childList: true, subtree: true });
})();
