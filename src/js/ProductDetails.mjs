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

    // get the addTocart button
    const addBtn = document.getElementById("addToCart");

    // get the local storage
    const cartItems = getLocalStorage("so-cart") || [];

    // find existing item in cart
    const existingItem = cartItems.find(item => item.Id === this.product.Id);

    if(existingItem) {
      // update the addBtn and show modal
      addBtn.addEventListener("click", () => this.showAlreadyAddedModal());
    } else {
      addBtn.addEventListener("click", () => this.addProductToCart(this.product));
    }

    // update cart count
    cartCount();
  }


// create the addProductTocart class
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

    // Show modal after adding again
    this.showAlreadyAddedModal();


  } else {
    // if it's a new item, add it to the cart with quantity of 1
    const newItem = { ...this.product, quantity: 1};
    cartItems.push(newItem);

    // update the lockAddToCartButton
    //this.lockAddToCartButton();
  }
  
  // save updated cart back to local storage
  setLocalStorage("so-cart", cartItems);

  // update the cart count badge
  cartCount();
}

// modal class for product that is already added to the cart
showAlreadyAddedModal() {
  const modal = document.getElementById("addedModal");
  modal.classList.remove("hide");

  // Close button
  document.getElementById("modalClose").addEventListener("click", () => {
    modal.classList.add("hide");
  });
}


// render the products details template
renderProductDetails() {
    productDetailsTemplate(this.product);
}
}

// create dynamic template using index.html from product_pages
function productDetailsTemplate(product) {
  qs(".product_brand_name").textContent = product.Brand.Name;
  qs(".product_name").textContent = product.NameWithoutBrand;

  const productImage = qs(".product__image");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;


  // NEW: Calculate the discount percentage
  const discountPercentage = Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);

  // Insert discount badge
  qs(".product__srp").textContent = `$${product.SuggestedRetailPrice}`;
  qs(".product__discount").textContent = `${discountPercentage}% OFF`;
  qs(".product-card__price").textContent = `$${product.FinalPrice}`;
  qs(".product__color").textContent = product.Colors[0].ColorName;
  qs(".product__description").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}
