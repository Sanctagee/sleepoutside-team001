import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");

const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);

//Initialize the elements of the page

product.init();

// console.log(dataSource.findProductById(productId));
