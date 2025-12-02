// ProductList.mjs
 function productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="../product_pages/product.html?id=${product.Id}">
          <img src="${product.Image.PrimaryMedium}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;       // e.g. "tents"
    this.dataSource = dataSource;   // instance of ProductData
    this.element= element; // DOM element where products will be rendered
    this.products = [];             // will hold fetched products
  }

  async init() {
    // Fetch product data using async/await
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  // Template function for a single product card


  // Render the list of products into the target element
  renderList(products) {
    const htmlStrings = products.map(this.productCardTemplate).join("");
    this.listElement.innerHTML = htmlStrings;
  }
}
