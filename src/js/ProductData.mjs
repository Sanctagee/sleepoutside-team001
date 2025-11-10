function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data)
      .catch(error => {
        console.error('Error fetching product data:', error);
        return [];
      });
  }
  
  async findProductById(id) {
    try {
      const products = await this.getData();
      return products.find((item) => item.Id === id);
    } catch (error) {
      console.error('Error finding product:', error);
      return null;
    }
  }
}