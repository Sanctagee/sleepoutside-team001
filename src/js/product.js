import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {

  let lastItems = getLocalStorage("so-cart") || [];

  lastItems.push(product);

  setLocalStorage("so-cart", lastItems);
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
