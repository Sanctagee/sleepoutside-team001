import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();

// handler for add to cart button
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// attach event listener to add to cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

// console.log(dataSource.findProductById(productId));
