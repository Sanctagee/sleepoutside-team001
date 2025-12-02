<<<<<<< HEAD
import ProductData from '../ProductData.mjs';
const dataSource = new ProductData('tents');

import ProductList from '../ProductList.mjs';
<script type="module" src="js/main.js"></script>
const listElement = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, listElement);
productList.init();


=======

import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";

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
>>>>>>> ee529849cd664015aeae045416c869db175d0348
