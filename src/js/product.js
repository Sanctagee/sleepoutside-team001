// Import utility functions for getting URL parameters and loading header/footer, and classes for external services and product details
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load the header and footer components of the page
loadHeaderFooter();

// Create an instance of ExternalServices to handle API calls for the "tents" category
const dataSource = new ExternalServices("tents");
// Retrieve the product ID from the URL query parameters
const productID = getParam("product");

// Create an instance of ProductDetails with the product ID and data source
const product = new ProductDetails(productID, dataSource);
// Initialize the product details functionality (e.g., fetching and rendering product data)
product.init();
