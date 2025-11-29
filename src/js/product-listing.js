import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load dynamic header/footer
loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    // Get category from URL parameter
    const category = getParam("category") || "all";
    // Initialize product list
    const dataSource = new ProductData();
    const listElement = document.querySelector(".product-list");
    const productList = new ProductList(category, dataSource, listElement);

    productList.init();
})
