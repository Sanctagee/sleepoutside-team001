// Import this new getParam function into product.js.
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer on page load
loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData("tents");

// Test the getParam function in product.js to see if the productId displays in the URL when a product is clicked.

const product = new ProductDetails(productId, dataSource);
product.init();
<<<<<<< HEAD

loadHeaderFooter();

=======
>>>>>>> dd8b1f619a6ce5b5e37c089f194bf65a00e46e36
