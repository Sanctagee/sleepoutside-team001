import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");

const details = new ProductDetails(productId, dataSource);

details.init();
