// Import this new getParam function into product.js.
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam('product');
const dataSource = new ProductData('tents');

// Test the getParam function in product.js to see if the productId displays in the URL when a product is clicked.

const product = new ProductDetails(productId, dataSource);
product.init();


