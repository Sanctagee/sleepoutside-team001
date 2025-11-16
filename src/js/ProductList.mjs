import { renderListWithTemplate } from "./utils.mjs";

// create a template function using /index.html markups

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
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
           // Filter by category if needed
    const filteredList = this.category ? 
      list.filter(product => product.Category.Name === this.category) : 
      list;
    
    this.renderList(filteredList);
    }

    // render list method);
    renderList(list) {
    renderListWithTemplate(
      productCardTemplate, 
      this.listElement, 
      list, 
      'beforeend', 
      true
    );
    
    }
}