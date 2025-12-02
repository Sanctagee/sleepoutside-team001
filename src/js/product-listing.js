import ExternalServices from './ExternalServices.mjs';
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load dynamic header/footer
loadHeaderFooter();

// Get category from URL parameter
const category = getParam("category");

// Initialize product list
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);

productList.init();


import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

const baseURL = import.meta.env.VITE_SERVER_URL;


loadHeaderFooter();

const category = getParam('category') ;
const dataSource = new ProductData();
document.querySelector('h1').textContent = `Top Products: ${category}`;

const listElement = document.querySelector('.product-list');
const myList = new ProductList(cartegory, dataSource, listElement);
myList.init();