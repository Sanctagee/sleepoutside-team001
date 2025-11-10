import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = 
      '<li class="cart-card divider"><p>Your cart is empty</p></li>';
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Add event listeners to remove buttons
  addRemoveButtonListeners();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-btn" data-index="${index}">Remove</button>
  </li>`;

  return newItem;
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
    renderCartContents(); // Refresh the cart display
  }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', renderCartContents);