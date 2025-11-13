<<<<<<< HEAD
function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}" class="product-card__link">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand?.Name ?? ""}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        // You passed in this information to make the class as reusable as possible.
        // Being able to define these things when you use the class will make it very flexible
=======
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
>>>>>>> 323693e5c847da4b0f9da173032c3b1ec1b34b79
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
<<<<<<< HEAD
    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const products = await this.dataSource.getData();
        // next, render the list – ** future **
        this.renderList(products);
    }

    renderList(products) {
        const htmlStrings = products.map(productCardTemplate);
        this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    }
}

=======

    // init method
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    // render list method
    renderList(list) {
        // use the map method to call the productCardTemplate once
        //const htmlStrings = list.map(productCardTemplate);
        // render the list template
        //this.listElement.insertAdjacentHTML("aferbegin", htmlStrings.join(""));

        // apply this new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
>>>>>>> 323693e5c847da4b0f9da173032c3b1ec1b34b79
