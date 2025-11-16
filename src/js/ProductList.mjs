import { renderListWithTemplate } from "./utils.mjs";

// create a template function using /index.html markups
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
    <img src="${product.Image}" alt="${product.Name}">
    <h2>${product.Brand.Name}</h2>
    <h3>${product.Name}</h3>
    <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    </li>`;
}

// create the product list class
export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    // init method
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    // render list method
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
