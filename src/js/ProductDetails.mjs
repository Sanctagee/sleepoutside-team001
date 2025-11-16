// import functions from modules
import { getLocalStorage, setLocalStorage, qs, cartCount } from "./utils.mjs";

// create the product details class
export default class ProductDetails {
  // keep track of important product info
  constructor(productId, dataSource, listElement, category) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.category = category;
  }

  // create the init() class
  async init() {
    // get product details using findProductById
    this.product = await this.dataSource.findProductById(this.productId);

    // render the product details 
    this.renderProductDetails();
    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.addEventListener("click", () => this.addProductToCart());
    }

    // ensure the cart count is initialized on the product page
    cartCount();
  }

  // To create the function that will add products to cart:
  addProductToCart() {
    // Always get cart items or initialize as empty array
    let cartItems = getLocalStorage("so-cart");
    
    // In a condition when it's not an array, start fresh with empty array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    // find if the item already exists in the cart
    const existingItem = cartItems.find((item) => item.Id === this.product.Id);

    if (existingItem) {
      // if it exists, just increment its quantity
      existingItem.quantity += 1;
    } else {
      // if it's a new item, add it to the cart with quantity of 1
      const newItem = { ...this.product, quantity: 1 };
      cartItems.push(newItem);
    }
    
    // save updated cart back to local storage
    setLocalStorage("so-cart", cartItems);

    // update the cart count badge
    cartCount();

    // Optional: Provide user feedback
    alert("Product added to cart!");
  }

  // render the products details template
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

// create dynamic template using index.html from product_pages
function productDetailsTemplate(product) {
  // Update product information
  qs("h2").textContent = product.Brand.Name;
  qs("h3").textContent = product.NameWithoutBrand;

  // Fix image selection - use proper selector for the image element
  const productImage = qs(".product-detail__image img") || qs(".product__image img") || document.querySelector("img");
  if (productImage) {
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;
  }

  // Update price
  const priceElement = qs(".product-card__price") || qs(".product__price");
  if (priceElement) {
    priceElement.textContent = `$${product.FinalPrice}`;
  }

  // Update color - check if Colors array exists
  const colorElement = qs(".product__color");
  if (colorElement && product.Colors && product.Colors.length > 0) {
    colorElement.textContent = product.Colors[0].ColorName;
  }

  // Update description
  const descriptionElement = qs(".product__description");
  if (descriptionElement) {
    descriptionElement.innerHTML = product.DescriptionHtmlSimple;
  }

  // Set product ID on add to cart button
  const addToCartBtn = document.getElementById('addToCart');
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.Id;
  }
}