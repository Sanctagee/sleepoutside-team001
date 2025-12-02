import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const productId = getParam('id');
const dataSource = new ProductData();

async function renderProductDetail() {
  const product = await dataSource.findProductById(productId);

  document.querySelector('.product-detail').innerHTML = `
    <h1>${product.Name}</h1>
    <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
    <p>${product.Description}</p>
    <p>Price: $${product.FinalPrice}</p>
  `;
}

renderProductDetail();

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
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  
  
