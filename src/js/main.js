import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create a data source for tents
const dataSource = new ProductData("tents");

// Grab the container in the DOM
const element = document.querySelector(".product-list");

// Create the product list instance
const productList = new ProductList("tents", dataSource, element);

// Initialize the list
productList.init();
