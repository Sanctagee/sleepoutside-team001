import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartElement = document.querySelector(".product-list");

  if (!cartElement) {
    console.error("❌ Cart element not found");
    return;
  }

  if (cartItems.length === 0) {
    cartElement.innerHTML =
      "<li class='cart-card divider'><p>Your cart is empty</p></li>";
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  cartElement.innerHTML = htmlItems.join("");

  addRemoveButtonListeners();
}

// call renderCartContents
renderCartContents();

function cartItemTemplate(item, index) {
  // Use the actual image from API data
  const imageUrl =
    item.Images?.PrimaryMedium || item.Image || "../images/placeholder.jpg";
  const productName = item.Name || item.NameWithoutBrand || "Unknown Product";
  const colorName = item.Colors?.[0]?.ColorName || "N/A";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
<<<<<<< HEAD
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
=======
      <img src="${imageUrl}" alt="${productName}" />
>>>>>>> wpl--individual3
    </a>
    <a href="#">
      <h2 class="card__name">${productName}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-btn" data-index="${index}">Remove</button>
  </li>`;
}

<<<<<<< HEAD

=======
>>>>>>> wpl--individual3
function addRemoveButtonListeners() {
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      removeFromCart(index);
    });
  });
}

function removeFromCart(index) {
  let cartItems = getLocalStorage("so-cart") || [];

  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", renderCartContents);
