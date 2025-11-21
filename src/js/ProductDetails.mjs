export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // get product details
    this.product = await this.dataSource.findProductById(this.productId);
    // render details
    this.renderProductDetails();
    // add to cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // logic to add product to cart
    console.log(`${this.product.Name} added to cart`);
  }

  renderProductDetails() {
    // Example: populate HTML
    document.querySelector('#productName').textContent = this.product.Name;
    document.querySelector('#productDescription').textContent = this.product.Description;
    document.querySelector('#productImage').src = this.product.Image;
  }
}
