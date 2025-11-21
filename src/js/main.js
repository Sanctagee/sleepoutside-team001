import ProductData from '../ProductData.mjs';
const dataSource = new ProductData('tents');

import ProductList from '../ProductList.mjs';
<script type="module" src="js/main.js"></script>
const listElement = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, listElement);
productList.init();


