import { renderListWithTemplate } from './utils.mjs';

// List of product IDs that have images
const availableProducts = ['880RR', '985RF', '985PR', '344YJ']; // Only these 4 have images from the json file

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
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
    try {
      const list = await this.dataSource.getData();
      // console.log('All products loaded:', list);
      
      // We have to filter the product to only show products that have images from the json file
      const filteredList = list.filter(product => 
        availableProducts.includes(product.Id)
      );
      
      // console.log('Filtered products:', filteredList);
      this.renderList(filteredList);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}