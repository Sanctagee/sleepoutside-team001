// read the product data out
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, cartCount } from "./utils.mjs";

import { loadHeaderFooter } from "./utils.mjs";

import { filterData, displayResults } from './search.js';



// create an instance of ProductData
const dataSource = new ProductData("tents");

// insert the html template into the DOM
const element = qs(".product-list");

const productList = new ProductList("Tents", dataSource, element);

// initialize product list and then set the cart count badge
productList.init().then(() => cartCount());

loadHeaderFooter();


document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResultsContainer = 'searchResults';

  searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    const filtered = filterData(dataSource, query);
    displayResults(filtered, searchResultsContainer);
  });

  // Initial display (optional)
  displayResults(dataSource, searchResultsContainer);
});