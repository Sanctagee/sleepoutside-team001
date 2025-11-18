import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

<<<<<<< HEAD
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
=======
// Load dynamic header/footer FIRST
loadHeaderFooter();

// Get product ID from URL parameter
const productId = getParam("product");
console.log("🛠️ Debug - Product ID:", productId);
console.log("🛠️ Debug - Current URL:", window.location.href);

// Initialize with API data source
const dataSource = new ProductData();

// Debug: Check if we can find the product
dataSource.findProductById(productId).then(product => {
    console.log("🛠️ Debug - Found Product:", product);
    const productDetails = new ProductDetails(productId, dataSource);
    productDetails.init();
}).catch(error => {
    console.error("🛠️ Debug - Product Loading Error:", error);
    document.querySelector("main").innerHTML = "<p>Error loading product. Check console.</p>";
});
>>>>>>> wpl--individual3
