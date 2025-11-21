import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');
const product = new ProductDetails(productId, dataSource);
product.init();

// To create the function that will add products to cart:
function addProductToCart(product) {
  // Always get cart items or initialize as empty array
  const cartItems = getLocalStorage("so-cart") || [];
  
 
  
  // To add new product to cart which is now an array
  cartItems.push(product);
  // To save updated cart back to local storage
  setLocalStorage("so-cart", cartItems);
}


// handler for add to cart button
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// attach event listener to add to cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
  
