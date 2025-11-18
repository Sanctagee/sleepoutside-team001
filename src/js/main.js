// read the product data out
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, cartCount } from "./utils.mjs";

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

// create an instance of ProductData
const dataSource = new ProductData("tents");

// insert the html template into the DOM
const element = qs(".product-list");

const productList = new ProductList("Tents", dataSource, element);

// initialize product list and then set the cart count badge
productList.init().then(() => cartCount());

loadHeaderFooter();
