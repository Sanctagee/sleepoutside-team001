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