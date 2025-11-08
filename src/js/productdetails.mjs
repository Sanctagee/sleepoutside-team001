import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      // Get product data by ID
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        console.error("Product not found for ID:", this.productId);
        document.querySelector("#product-details").innerHTML = `
          <p class="error">Sorry, we couldn’t find this product.</p>`;
        return;
      }

      // Render details and set up Add to Cart button
      this.renderProductDetails();

      const addBtn = document.getElementById("addToCart");
      if (addBtn) {
        addBtn.addEventListener("click", this.addToCart.bind(this));
      }
    } catch (error) {
      console.error("Error loading product details:", error);
    }
  }

  addToCart() {
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    console.log("✅ Product added to cart:", this.product);

    // Optional: brief visual feedback
    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.textContent = "Added!";
      addBtn.disabled = true;
      setTimeout(() => {
        addBtn.textContent = "Add to Cart";
        addBtn.disabled = false;
      }, 1500);
    }
  }

  renderProductDetails() {
    const product = this.product;

    // Calculate discount percentage if applicable
    let discountPercent = null;
    if (product.SuggestedRetailPrice && product.SuggestedRetailPrice > product.FinalPrice) {
      discountPercent = Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
      );
    }

    // Fill in product details
    document.querySelector("#productName").textContent = product.Name;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productDescription").innerHTML = product.DescriptionHtmlSimple;

    // Handle price display
    const priceContainer = document.querySelector("#productPrice");
    if (discountPercent) {
      priceContainer.innerHTML = `
        <p class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</p>
        <p class="final-price">$${product.FinalPrice.toFixed(2)}</p>
        <span class="discount-badge">-${discountPercent}%</span>
      `;
    } else {
      priceContainer.innerHTML = `<p class="final-price">$${product.FinalPrice.toFixed(2)}</p>`;
    }

    // Update page title
    document.title = `SleepOutside - ${product.Name}`;
  }
}
