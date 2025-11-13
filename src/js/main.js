<<<<<<< HEAD
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
// Create the product data source (tents.json)
const dataSource = new ProductData("tents");

// Select the HTML element where products will display
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
const productList = new ProductList("tents", dataSource, listElement);

// Initialize and display the products
productList.init();
=======
// read the product data out
import ProductData from "./ProductData.mjs";

import ProductList from "./ProductList.mjs";

import { qs, cartCount } from "./utils.mjs";

// create an instance of ProductData
const dataSource = new ProductData("tents");

// insert the html template into the DOM
const element = qs(".product-list");

const productList = new ProductList("Tents", dataSource, element);

// initialize product list and then set the cart count badge
productList.init().then(() => cartCount());
>>>>>>> 323693e5c847da4b0f9da173032c3b1ec1b34b79
