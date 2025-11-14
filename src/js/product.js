// Import this new getParam function into product.js.
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam('product');
const dataSource = new ProductData('tents');

// Test the getParam function in product.js to see if the productId displays in the URL when a product is clicked.
<<<<<<< HEAD
//const productId = getParam("product");
=======
>>>>>>> 6b35cb8a89128e2da95ca721ebdc46f593c67417

const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();
