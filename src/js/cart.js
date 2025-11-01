import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  renderCartTotal(cartItems); //calculate total after rendering
}

function cartItemTemplate(item) {
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
  
  
  //Calulate and show total
  function renderCartTotal(cartItems) {
    const totalElement = document.getElementById("cart-total");
    if (!totalElement) return;

    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, total) => + parseFloat(item.FinalPrice),
        0
      );
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    } else {
        totalElement.textContent = "";
      }
    }
}

renderCartContents();
