
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  loadHeaderFooter();
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    const alertSystem = new Alert();
    await alertSystem.init();
  }
});

// loadHeaderFooter();
