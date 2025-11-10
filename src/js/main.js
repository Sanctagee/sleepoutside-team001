import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// Initialize product list on main page
const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');

// Only initialize if we're on the main page (has product list)
// ===== To expand this later, we could use the try catch error block to make this better =====
if (listElement) {
  const productList = new ProductList('tents', dataSource, listElement);
  productList.init();
}