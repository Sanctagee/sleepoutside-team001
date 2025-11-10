// Import this new getParam function into product.js.
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

// To create the function that will add products to cart:
function addProductToCart(product) {
  // Always get cart items or initialize as empty array
  let cartItems = getLocalStorage("so-cart");
  
  // In a condition when it's not an array, start fresh with empty array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  
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
