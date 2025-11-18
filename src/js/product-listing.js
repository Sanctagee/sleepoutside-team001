// product-listing.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { filterData } from './search.js';

loadHeaderFooter();

const category = getParam("category");

// Load ALL data for that category
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);

let allProducts = []; // store fetched data

document.addEventListener("DOMContentLoaded", async () => {
  allProducts = await dataSource.getData(category);

  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", event => {
    const query = event.target.value;

    const filtered = filterData(allProducts, query);

    // Use your existing rendering system
    productList.renderList(filtered);
  });

  // show initial category list
  productList.renderList(allProducts);
});
