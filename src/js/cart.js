// Import utility functions for accessing local storage and loading header/footer
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

// Load the header and footer components of the page
loadHeaderFooter();

// Function to render the contents of the shopping cart
function renderCartContents() {
  // Retrieve cart items from local storage
  const cartItems = getLocalStorage("so-cart");
  // Map each cart item to its HTML template
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // Join the HTML templates and insert them into the product list element
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Function to generate HTML template for a single cart item
function cartItemTemplate(item) {
  // Create HTML string for a cart item with its image, name, color, quantity, and price
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Call the function to render the cart contents on page load
renderCartContents();
