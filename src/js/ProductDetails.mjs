import { getLocalStorage, setLocalStorage, qs, cartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.addEventListener("click", () => this.addToCart());
    }

    cartCount();
  }

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
    
    setLocalStorage("so-cart", cartItems);
    cartCount();
    this.showCartNotification();
  }

  showCartNotification() {
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `✅ ${this.product.Name} added to cart!`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  const h3Element = qs("h3");
  const h2Element = qs("h2");
  
  if (h3Element) h3Element.textContent = product.Brand?.Name || "Unknown Brand";
  if (h2Element) h2Element.textContent = product.NameWithoutBrand || product.Name || "Unknown Product";

  const productImage = qs(".product__image");
  if (productImage && product.Images) {
    productImage.src = product.Images.PrimaryLarge || product.Images.PrimaryMedium || "../images/placeholder.jpg";
    productImage.alt = product.NameWithoutBrand || product.Name || "Product Image";
  }

  // Calculate discount
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
  if (descriptionElement && product.DescriptionHtml) {
    descriptionElement.innerHTML = product.DescriptionHtml;
  }

  const addToCartBtn = document.getElementById('addToCart');
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.Id;
  }
}