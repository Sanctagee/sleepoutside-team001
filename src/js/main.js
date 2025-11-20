
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";

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
document.addEventListener("DOMContentLoaded", async function () {
  loadHeaderFooter();
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    const alertSystem = new Alert();
    await alertSystem.init();
  }
});

// loadHeaderFooter();
