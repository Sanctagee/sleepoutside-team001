import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartElement = document.querySelector(".product-list");
  const cartCount = document.querySelector(".count-items");
  
  if (!cartElement) return console.error("❌ Cart element not found");

  // updates the cart count
  cartCount.textContent = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // handles an empty cart
  if (cartItems.length === 0) {
    cartElement.innerHTML = '<li class="cart-card divider"><p>Your cart is empty</p></li>';
    return;
  }


  cartElement.innerHTML = cartItems.map((item, index) => cartItemTemplate(item, index)).join("");
  
  addRemoveButtonListeners();
  addQuantityListeners();
}

function cartItemTemplate(item, index) {
  // Use the actual image from API data
  const imageUrl = item.Images?.PrimaryMedium || item.Image || '../images/placeholder.jpg';
  const productName = item.Name || item.NameWithoutBrand || 'Unknown Product';
  const colorName = item.Colors?.[0]?.ColorName || 'N/A';
  const quantity = item.quantity || 1;
  
  return `<li class="cart-card divider" data-index="${index}">
    <a href="#" class="cart-card__image">
      <img src="${imageUrl}" alt="${productName}" />
    </a>
    <div>
      <h2 class="card__name">${productName}</h2>
      <p class="cart-card__color">${colorName}</p>

      <div class="qty-controls">
        <button class="qty-decrease">-</button>
        <input type="number" class="qty-input" min="1" value="${quantity}">
        <button class="qty-increase">+</button>
      </div>

      <p class="cart-card__price">$${item.FinalPrice ?? '0.00'}</p>
      <button class="remove-btn">Remove</button>
      </div>
  </li>`;
}

function addQuantityListeners() {
  const cartItems = getLocalStorage("so-cart") || [];

  document.querySelectorAll(".cart-card").forEach(card => {
    const index = parseInt(card.getAttribute("data-index"));
    const item = cartItems[index];

    const input = card.querySelector(".qty-input");
    const btnMinus = card.querySelector(".qty-decrease");
    const btnPlus = card.querySelector(".qty-increase");

    // input change
    input.addEventListener("change", () => {
      let qty = parseInt(input.value);
      if (isNaN(qty) || qty < 1) qty = 1;
      item.quantity = qty;
      saveAndRender(cartItems);
    })

    // minus button
    btnMinus.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        input.value = item.quantity;
        saveAndRender(cartItems);
      }
    })

    // plus button
    btnPlus.addEventListener("click", () => {
      item.quantity++;
      input.value = item.quantity;
      saveAndRender(cartItems);
    })
  })
}

function addRemoveButtonListeners() {
  const cartItems = getLocalStorage("so-cart") || [];

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.closest(".cart-card").getAttribute("data-index"));
      cartItems.splice(index, 1);
      saveAndRender(cartItems);
    })
  });
}

function saveAndRender(cartItems) {
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', renderCartContents);