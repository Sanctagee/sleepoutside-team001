import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  qs,
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
    // Reset totals to zero when cart is empty
    resetCartTotals();
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  cartElement.innerHTML = htmlItems.join("");

  addRemoveButtonListeners();
  calculateItemSummary(); // This should now work properly
}

// FIXED: Better image path handling
function cartItemTemplate(item, index) {
  console.log("🎨 Renderizando item do carrinho:", item.Id);

  // CORREÇÃO DA IMAGEM
  let imageUrl = "../images/placeholder.jpg";
  if (item.Image && typeof item.Image === "object") {
    imageUrl =
      item.Image.PrimaryMedium ||
      item.Image.PrimaryLarge ||
      "../images/placeholder.jpg";
  } else if (typeof item.Image === "string") {
    imageUrl = item.Image;
  }

  // CORREÇÃO DO TEMPLATE - use remove-btn e data-index
  return `<li class="cart-card divider">
    <button class="remove-btn" data-index="${index}">❌</button>
    <div class="cart-card__image">
      <img src="${imageUrl}" alt="${item.Name}" 
           onerror="this.src='../images/placeholder.jpg'">
    </div>
    <div class="cart-card__info">
      <h2 class="card__name">${item.Name}</h2>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "Standard Color"}</p>
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </div>
  </li>`;
}

function addRemoveButtonListeners() {
  // Remove buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      removeFromCart(index);
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

function removeFromCart(index) {
  let cartItems = getLocalStorage("so-cart") || [];

  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

function updateQuantity(index, change) {
  let cartItems = getLocalStorage("so-cart") || [];

  if (index >= 0 && index < cartItems.length) {
    const item = cartItems[index];
    const newQuantity = (item.quantity || 1) + change;

    if (newQuantity <= 0) {
      // Remove item if quantity becomes 0 or less
      removeFromCart(index);
    } else {
      // Update quantity
      item.quantity = newQuantity;
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    }
  }
}

const taxRate = 0.06;

function calculateShipping(cartItems) {
  if (cartItems.length === 0) return 0;

  const firstItem = 10;
  const additionalItem = 2;

  // Calculate total number of items (considering quantities)
  const totalItems = cartItems.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

  if (totalItems === 1) return firstItem;

  return firstItem + (totalItems - 1) * additionalItem;
}

// FIXED: Complete calculateItemSummary function
function calculateItemSummary() {
  const cartItems = getLocalStorage("so-cart") || [];
  let subtotal = 0;

  console.log("🛒 Calculating totals for", cartItems.length, "items");

  // Add up all items with quantities
  cartItems.forEach((item) => {
    const qty = item.quantity || 1;
    const itemTotal = item.FinalPrice * qty;
    subtotal += itemTotal;
    console.log(
      `📦 ${item.Name}: $${item.FinalPrice} x ${qty} = $${itemTotal}`,
    );
  });

  // Calculate values
  const tax = subtotal * taxRate;
  const shipping = calculateShipping(cartItems);
  const orderTotal = subtotal + tax + shipping;

  console.log("💰 Final Totals:", {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    shipping: shipping.toFixed(2),
    orderTotal: orderTotal.toFixed(2),
  });

  // Update Order Summary - with null checks
  updateElementText("subtotal", subtotal.toFixed(2));
  updateElementText("tax", tax.toFixed(2));
  updateElementText("shipping", shipping.toFixed(2));
  updateElementText("order-total", orderTotal.toFixed(2));
}

// Helper function to safely update element text
function updateElementText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  } else {
    console.warn(`❌ Element with id '${id}' not found`);
  }
}

// Reset totals to zero when cart is empty
function resetCartTotals() {
  updateElementText("subtotal", "0.00");
  updateElementText("tax", "0.00");
  updateElementText("shipping", "0.00");
  updateElementText("order-total", "0.00");
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", renderCartContents);
