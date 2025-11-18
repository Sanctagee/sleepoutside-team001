<<<<<<< HEAD
// read the product data out
import ProductData from "./ProductData.mjs";

import ProductList from "./ProductList.mjs";

import { qs, cartCount, getParam, loadHeaderFooter } from "./utils.mjs";

// loade the header and footer
loadHeaderFooter();

// Get the product category
const category = getParam("category");

// create an instance of ProductData
const dataSource = new ProductData();

// insert the html template into the DOM
const element = qs(".product-list");

const productList = new ProductList(category, dataSource, element);

// initialize product list and then set the cart count badge
productList.init().then(() => cartCount());
=======
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load dynamic header/footer
loadHeaderFooter();

// Get category from URL parameter
const category = getParam("category");

// Initialize product list
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);

productList.init();
>>>>>>> wpl--individual3

