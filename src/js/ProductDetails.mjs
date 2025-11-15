// This script file will be programmed to
// contain the code to dynamically produce
// the product detail pages.

import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";



export default class ProductDetails{

    constructor(productId, dataSource) {

        this.productId = productId;
        // this.product almacenará los detalles de un solo product
        this.product = {};

        this.dataSource = dataSource;


    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it

        this.product = await this.dataSource.findProductById(this.productId);

        // the product details are needed before rendering the HTML

        this.renderProductDetails();

        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
      // First, We need to obtain the last element saved in the variable in Local Storage called "so-cart"
      const lastItems = getLocalStorage("so-cart") || [];
    
      lastItems.push(this.product);
    
      setLocalStorage("so-cart", lastItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }

}

function productDetailsTemplate(product) {

    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector("#product-image");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.querySelector("#product-price").textContent = `$${product.FinalPrice}`;

    document.querySelector("#product-color").textContent = product.Colors.map(c => c.ColorName).join(", ");

    document.querySelector("#product-description").innerHTML = product.DescriptionHtmlSimple;
}
