import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load dynamic header/footer FIRST
loadHeaderFooter();

// Get product ID from URL parameter
const productId = getParam("product");
console.log("🛠️ Debug - Product ID:", productId);
console.log("🛠️ Debug - Current URL:", window.location.href);

if (!productId) {
    document.querySelector("main").innerHTML = "<p>Invalid product. No ID provided in URL. </p>"
    throw new Error("No product ID in URL");
}

// Initialize with API data source
const dataSource = new ProductData();

// Debug: Check if we can find the product
dataSource.findProductById(productId)
    .then(product => {
        if (!product) {
            throw new Error(`Product with ID${productId} not found.`);
        }
        console.log("🛠️ Debug - Found Product:", product);

        const productDetails = new ProductDetails(productId, dataSource);
        productDetails.init();
    })
    .catch(error => {
        console.error("🛠️ Debug - Product Loading Error:", error);
        document.querySelector("main").innerHTML = "<p>Error loading product. Check console.</p>";
});