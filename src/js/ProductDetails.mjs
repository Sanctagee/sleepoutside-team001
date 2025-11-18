// import functions from modules
import { getLocalStorage, setLocalStorage, qs, cartCount } from "./utils.mjs";

// create the product details class
export default class ProductDetails {
  // keep tract of important product info
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  // create the init() class
  async init() {
    // get product details using findProductById
    this.product = await this.dataSource.findProductById(this.productId);

    // render the product details 
    this.renderProductDetails();
    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.addEventListener("click", () => this.addToCart());
    }

    // ensure the cart count is initialized on the product page
    cartCount();
  }

// Creating the function that will add item to cart
addToCart() {
  let cartItems = getLocalStorage("so-cart") || [];
  
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  const existingItem = cartItems.find((item) => item.Id === this.product.Id);

  if(existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = { ...this.product, quantity: 1};
    cartItems.push(newItem);
  }
  
  // save updated cart back to local storage
  setLocalStorage("so-cart", cartItems);

  // update the cart count badge
  cartCount();

  // 🎯 MODERN NOTIFICATION (instead of basic alert)
  this.showCartNotification();
}

// 🎯 ADD THIS NEW METHOD TO YOUR ProductDetails CLASS
showCartNotification() {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.cart-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create new notification
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `✅ ${this.product.Name} added to cart!`;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}



// render the products details template
renderProductDetails() {
    productDetailsTemplate(this.product);
}
}

// To create dynamic template using index.html from product_pages

function productDetailsTemplate(product) {
<<<<<<< HEAD
  qs(".product_brand_name").textContent = product.Brand.Name;
  qs(".product_name").textContent = product.NameWithoutBrand;

  const productImage = qs(".product__image");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;
=======
  const h3Element = qs("h3");
  const h2Element = qs("h2");
  
  if (h3Element) h3Element.textContent = product.Brand.Name;
  if (h2Element) h2Element.textContent = product.NameWithoutBrand;

  const productImage = qs(".product__image");
  if (productImage) {
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;
  }
>>>>>>> wpl--individual3

  // Calculate discount (API data structure)
  const discountPercentage = product.SuggestedRetailPrice ? 
    Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100) : 0;

  // Update elements
  const srpElement = qs(".product__srp");
  const discountElement = qs(".product__discount");
  const priceElement = qs(".product-card__price");
  const colorElement = qs(".product__color");
  const descriptionElement = qs(".product__description");
  
  if (srpElement && product.SuggestedRetailPrice) {
    srpElement.textContent = `$${product.SuggestedRetailPrice}`;
  }
  if (discountElement && discountPercentage > 0) {
    discountElement.textContent = `${discountPercentage}% OFF`;
  }
  if (priceElement) priceElement.textContent = `$${product.FinalPrice}`;
  if (colorElement && product.Colors && product.Colors[0]) {
    colorElement.textContent = product.Colors[0].ColorName;
  }
  if (descriptionElement) descriptionElement.innerHTML = product.DescriptionHtml;

  const addToCartBtn = document.getElementById('addToCart');
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.Id;
  }
}