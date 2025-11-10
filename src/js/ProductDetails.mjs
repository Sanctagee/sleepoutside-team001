// import functions from modules
import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

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

    // add event listener to the AddToCart button
    document
    .getElementById("addToCart")
    .addEventListener("click", this.addProductToCart.bind(this));
  }


// To create the function that will add products to cart:
addProductToCart() {
  // Always get cart items or initialize as empty array
  let cartItems = getLocalStorage("so-cart");
  
  // In a condition when it's not an array, start fresh with empty array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  
  // To add new product to cart which is now an array
  cartItems.push(product);
  // To save updated cart back to local storage
  setLocalStorage("so-cart", cartItems);
}

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
