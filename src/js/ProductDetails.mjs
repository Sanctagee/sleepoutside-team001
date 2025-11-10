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
      addBtn.addEventListener("click", () => this.addProductToCart(this.product));
    }

    // ensure the cart count is initialized on the product page
    cartCount();
  }


// Refactor AddproductToCart function to update cartCount
addProductToCart() {
  // Always get cart items or initialize as empty array
  let cartItems = getLocalStorage("so-cart");
  
  // In a condition when it's not an array, start fresh with empty array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // find if the item already exists in the cart
  const existingItem = cartItems.find((item) => item.Id === this.product.Id);

  if(existingItem) {
    // if it exists, just increment its quantity
    existingItem.quantity += 1;
  } else {
    // if it's a new item, add it to the cart with quantity of 1
    const newItem = { ...this.product, quantity: 1};
    cartItems.push(newItem);
  }
  
  // save updated cart back to local storage
  setLocalStorage("so-cart", cartItems);

  // update the cart count badge
  cartCount();
}

// render the products details template
renderProductDetails() {
    productDetailsTemplate(this.product);
}
}

// create dynamic template using index.html from product_pages
function productDetailsTemplate(product) {
  qs("h2").textContent = product.Brand.Name;
  qs("h3").textContent = product.NameWithoutBrand;

  const productImage = qs(".divider");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  qs(".product-card__price").textContent = product.FinalPrice;
  qs(".product__color").textContent = product.Colors[0].ColorName;
  qs(".product__description").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}
