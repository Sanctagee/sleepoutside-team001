import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartData = localStorage.getItem("so-cart");
  let cart = [];
  if (cartData) {
    const parsedData = JSON.parse(cartData);
    if (Array.isArray(parsedData)) {
      cart = parsedData;
    } else if (typeof parsedData === "object" && parsedData !== null) {
      cart = [parsedData];
    }
  }
  cart.push(product);
  localStorage.setItem("so-cart", JSON.stringify(cart));
  console.log("Product added to cart:", product);
  console.log("Cart now has:", cart.length, "items");
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
