import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
      // fetch the product details from the data source
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        // attach event listener to add to cart button
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }
      // To create the function that will add products to cart:
    addProductToCart(product) {
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

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}