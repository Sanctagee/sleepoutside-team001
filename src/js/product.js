import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Modify code that fixed cart broken
function addProductToCart(product) {
  // Get cart array of items from local storage if null
  const cartItems = getLocalStorage("so-cart") || [];
  // Push the items into the array object
  cartItems.push(product);
  // Set the local storage
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
