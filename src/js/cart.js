import { getLocalStorage } from "./utils.mjs";

function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
}

function updateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const total = calculateCartTotal(cartItems);
  const totalElement = document.getElementById("cartTotal");

  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }
}

function cartItemTemplate(item) {
  let imagePath = item.Image;
  if (imagePath.startsWith("../")) {
    imagePath = imagePath.substring(3);
  }
  if (!imagePath.startsWith("/")) {
    imagePath = "/" + imagePath;
  }

  return `
    <li class="cart-card divider">
      <span class="remove-item" data-id="${item.Id}">X</span>
      <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img src="${imagePath}" alt="${item.Name}" />
      </a>
      <div class="cart-card__info">
        <a href="../product_pages/index.html?product=${item.Id}">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "Standard Color"}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
      </div>
    </li>
  `;
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  const removedItem = cart.find((item) => item.Id === productId);

  cart = cart.filter((item) => item.Id !== productId);

  localStorage.setItem("so-cart", JSON.stringify(cart));

  renderCartContents();
}

function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    });
  });

  // Quantity increase buttons
  const increaseButtons = document.querySelectorAll(".quantity-btn.increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      updateQuantity(index, 1); // Increase by 1
    });
  });

  // Quantity decrease buttons
  const decreaseButtons = document.querySelectorAll(".quantity-btn.decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      updateQuantity(index, -1); // Decrease by 1
    });
  });
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartContainer = document.querySelector(".product-list");

  if (!cartContainer) {
    return;
  }

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    updateCartTotal();
    return;
  }

  const htmlStrings = cartItems.map(cartItemTemplate);
  cartContainer.innerHTML = htmlStrings.join("");

  updateCartTotal();

  addRemoveListeners();
}

document.addEventListener("DOMContentLoaded", function () {
  renderCartContents();
});

document.addEventListener("DOMContentLoaded", function () {
  const checkoutButton = document.querySelector(".checkout-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      const cartItems = getLocalStorage("so-cart") || [];
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert(
        `Proceeding to checkout with $${calculateCartTotal(cartItems).toFixed(2)} total`,
      );
    });
  }
});

export { renderCartContents, calculateCartTotal };
