import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get product details
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Render product details
    this.renderProductDetails();
    
    // Add event listener to Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    let cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
    
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
    
    // Optional: Show confirmation
    alert('Product added to cart!');
  }

  renderProductDetails() {
    // Create the product details HTML
    const productHTML = `
      <div class="product-detail">
        <img src="${this.product.Image}" alt="${this.product.Name}">
        <h2 class="card__name">${this.product.Name}</h2>
        <h3 class="card__brand">${this.product.Brand}</h3>
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.Description}</p>
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
    
    // Insert into the page
    document.getElementById('product-details-container').innerHTML = productHTML;
  }
}