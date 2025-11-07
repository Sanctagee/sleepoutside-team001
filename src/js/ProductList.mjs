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
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
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

