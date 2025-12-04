import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
// first create an instance of ExternalServices class
const dataSource = new ExternalServices();
//then get the element you want to render the product list into
const element = document.querySelector(".product-list");
// finally create an instance of ProductList class
const listing = new ProductList(category, dataSource, element);

listing.init();
