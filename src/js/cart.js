//import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage, setLocalStorage, loadHeaderFooter, qs, cartCount } from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

// html string template for cart.html
function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <div class="cart-card__quantity-controls">
    <button class="qty-btn" data-id="${item.Id}" data-action="increment" aria-label="Increment Quantity Button">+</button>
    <button class="qty-btn" data-id="${item.Id}" data-action="decrement" aria-label="Decrement Quantity Button">-</button>
    </div>

    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${(item.FinalPrice * item.quantity).toFixed(2)}</p>

    <button class="remove-btn" data-index="${index}">Remove</button>
  </li>`;

  return newItem;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
   
  if (cartItems.length === 0) {
    qs(".product-list").innerHTML = 
      '<li class="cart-card divider"><p>Your cart is empty</p></li>';
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  qs(".product-list").innerHTML = htmlItems.join("");
  
  // Add event listeners to remove buttons
  addRemoveButtonListeners();

  // call the incrementDecrementButtons function
  incrementDecrementButtons();
  
}

// call renderCartContents
renderCartContents();

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
  // update the cart count in header
  loadHeaderFooter();
}

// function to increase or decrease the product count when "+" or "-" button is clicked
function incrementDecrementButtons() {
  const incrementDecrementBtns = document.querySelectorAll(".qty-btn");
  incrementDecrementBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const id = btn.dataset.id;

      if(action === "increment") {
        // call update quantity for increment
        updateQuantity(id, 1);
      } 
      else if(action === "decrement") {
        // call update quantity for decrement
        updateQuantity(id, -1);
      }
    });
  });
  // update the cart count in the header
  cartCount();
}

// function to update quantity when "+" or "-" button is clicked
function updateQuantity(id, change) {
  const cartItems = getLocalStorage("so-cart") || [];
  const item = cartItems.find((cartItems) => cartItems.Id === id);

  if(item) {
    item.quantity += change;
    if(item.quantity < 1) {
      removeFromCart(id);
      return;
    }
    // set the local storage
    setLocalStorage("so-cart", cartItems);
    // call renderCartContents function
    renderCartContents();
  }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', renderCartContents);