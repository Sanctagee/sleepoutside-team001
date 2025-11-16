import { renderListWithTemplate, qs } from "./utils.mjs";

// create a template function using /index.html markups
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
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
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        // Fix the title - Top Products: Backpacks, if Backpacks category link was selected
        qs(".title").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);

    }

    // render list method
    renderList(list) {
        // use the map method to call the productCardTemplate once
        //const htmlStrings = list.map(productCardTemplate);
        // render the list template
        //this.listElement.insertAdjacentHTML("aferbegin", htmlStrings.join(""));

        // apply this new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list );
    }
}
