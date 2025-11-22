// Import this new getParam function into product.js.
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

// Test the getParam function in product.js to see if the productId displays in the URL when a product is clicked.
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

const priceElem = document.querySelector(".product-price");
const oldPriceElem = document.querySelector(".product-old-price");
const discountElem = document.querySelector(".discount-product-badge");

// Setting the final price
priceElem.textContent = `$${product.FinalPrice}`;

// If discounted
if (product.FinalPrice < product.SuggestedRetailPrice) {
    // shows the original price crossed out
    oldPriceElem.textContent = `$${product.SuggestedRetailPrice}`;
    oldPriceElem.style.textDecoration = "line-through";
    // calculating the percentage off
    const discountPercent = Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
            product.SuggestedRetailPrice * 100)
    );

    // badge text
    discountElem.textContent = `${discountPercent}% OFF`;
    discountElem.classList.add("discount-badge");
}

loadHeaderFooter();
