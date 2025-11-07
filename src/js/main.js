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