import { renderListWithTemplate, qs } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
    <h2 class="card__brand">${product.Brand.Name}</h2>
    <h3 class="card__name">${product.NameWithoutBrand}</h3>
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
        
        // Update page title with category
        this.updatePageTitle();
    }

    renderList(list) {
        this.listElement.innerHTML = "";
        
        if (!list || list.length === 0) {
            this.listElement.innerHTML = "<p>No products found.</p>";
            return;
        }
        renderListWithTemplate(productCardTemplate, this.listElement, list, "beforeend", false);
    }

    updatePageTitle() {
        const titleElement = document.querySelector("h2");
        if (titleElement && this.category) {
            titleElement.textContent = `Top Products: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
        }
    }
}