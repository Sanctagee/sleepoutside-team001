import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

// Create a data source instance for "tents"
const dataSource = new ProductData("tents");

// Get the product ID from the URL query string (?product=123)
const productID = getParam("product");

// Create a new ProductDetails instance and initialize it
const product = new ProductDetails(productID, dataSource);
product.init();
