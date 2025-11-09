import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
        <li class="product-card">
        <a href="product_pages/?products=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}">
            <h2>${product.Brand.Name}</h2>
            <h3>${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
        </li>
    `;
}

export default class ProductList {
    constructor(productCategory, dataSource, listElement) {
        this.productCategory = productCategory;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();

        this.renderList(list);
    }

    renderList(list) {
        //First renderList
        //const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}