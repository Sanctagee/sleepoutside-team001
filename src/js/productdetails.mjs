import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    console.log("Product added to cart:", this.product);
  }

  renderProductDetails() {
    document.querySelector("#productName").textContent = this.product.Name;
    document.querySelector("#productPrice").textContent =
      `$${this.product.FinalPrice}`;
    document.querySelector("#productImage").src = this.product.Image;
    document.querySelector("#productImage").alt = this.product.Name;
    document.querySelector("#productDescription").innerHTML =
      this.product.DescriptionHtmlSimple;
    document.title = `SleepOutside - ${this.product.Name}`;
  }
}