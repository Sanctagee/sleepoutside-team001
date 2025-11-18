<<<<<<< HEAD
=======
// read the product data out
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, cartCount } from "./utils.mjs";

>>>>>>> wpl--individual3
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

loadHeaderFooter();
