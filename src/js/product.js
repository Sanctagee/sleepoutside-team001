
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import buildBreadcrumb from "./breadcrumb.mjs";

// Load header and footer on page load
loadHeaderFooter();

const productId = getParam("product");
console.log("Product ID from URL:", productId);

const dataSource = new ExternalServices();

// Test the getParam function in product.js to see if the productId displays in the URL when a product is clicked.
const product = new ProductDetails(productId, dataSource);
product.init();

document.addEventListener("DOMContentLoaded", () => {
    buildBreadcrumb();
});

