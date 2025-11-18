import { renderListWithTemplate, qs } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
<<<<<<< HEAD
    <a href="/product_pages/?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
    <h2>${product.Brand.Name}</h2>
    <h3>${product.Name}</h3>
=======
    <a href="../product_pages/index.html?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
    <h2 class="card__brand">${product.Brand.Name}</h2>
    <h3 class="card__name">${product.NameWithoutBrand}</h3>
>>>>>>> wpl--individual3
    <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
<<<<<<< HEAD
        // Fix the title - Top Products: Backpacks, if Backpacks category link was selected
        qs(".title").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);

=======
        
        // Update page title with category
        this.updatePageTitle();
>>>>>>> wpl--individual3
    }

    renderList(list) {
<<<<<<< HEAD
        // use the map method to call the productCardTemplate once
        //const htmlStrings = list.map(productCardTemplate);
        // render the list template
        //this.listElement.insertAdjacentHTML("aferbegin", htmlStrings.join(""));

        // apply this new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list );
=======
        // Clear existing content
        this.listElement.innerHTML = "";
        renderListWithTemplate(productCardTemplate, this.listElement, list);
>>>>>>> wpl--individual3
    }

    updatePageTitle() {
        const titleElement = document.querySelector("h2");
        if (titleElement && this.category) {
            titleElement.textContent = `Top Products: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
        }
    }
}