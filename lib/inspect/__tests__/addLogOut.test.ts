import { describe, expect, it } from "vitest";
import { addLogOut } from "@/lib/inspect/addLogOut";

const page = `<body>
<div id="root"></div>
<script type="module" src="/board/app.js?v=1"></script>
</body>
</html>`;

describe("addLogOut", () => {
  it("loads the script that puts Log out in the profile popover", () => {
    expect(addLogOut(page)).toContain('<script src="/log-out.js" defer></script>\n</body>');
  });

  it("leaves the rest of the page alone", () => {
    expect(addLogOut(page).replace('<script src="/log-out.js" defer></script>\n', "")).toBe(page);
  });
});
