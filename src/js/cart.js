import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartElement = document.querySelector(".product-list");
  
  if (!cartElement) {
    console.error("❌ Cart element not found");
    return;
  }

  if (cartItems.length === 0) {
    cartElement.innerHTML = '<li class="cart-card divider"><p>Your cart is empty</p></li>';
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  cartElement.innerHTML = htmlItems.join("");
  
  addRemoveButtonListeners();

  calculateItemSummary();
}

function cartItemTemplate(item, index) {
  // Use the actual image from API data
  const imageUrl = item.Images?.PrimaryMedium || item.Image || '../images/placeholder.jpg';
  const productName = item.Name || item.NameWithoutBrand || 'Unknown Product';
  const colorName = item.Colors?.[0]?.ColorName || 'N/A';
  
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imageUrl}" alt="${productName}" />
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

function addRemoveButtonListeners() {
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
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

const taxRate = 0.06;

function calculateShipping(cartItems) {
  if (cartItems.length === 0) return 0;

  const firstItem = 10;
  const additionalItem = 2;

  if (cartItems.length === 1) return firstItem;
  
  return firstItem + (cartItems.length - 1) * additionalItem;
}

function calculateItemSummary() {
  const cartItems = getLocalStorage("so-cart") || [];
  let subtotal = 0;


  //add up all items
  cartItems.forEach(item => {
    const qty = item.quantity || 1;
    subtotal += item.FinalPrice * qty;
  });

  //calculate values
  const tax = subtotal * taxRate;
  const shipping = calculateShipping(cartItems);
  const orderTotal = subtotal + tax + shipping;

  //update Order Summary
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("shipping").textContent = shipping.toFixed(2);
  document.getElementById("order-total").textContent = orderTotal.toFixed(2);
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', renderCartContents);