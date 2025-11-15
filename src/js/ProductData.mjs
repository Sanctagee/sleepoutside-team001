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
  
  //Obtiene toda la información del tents.json
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    // Recupera todo el arreglo de productos del JSON.
    const products = await this.getData();
    // Busca un objeto donde Id === id.
    return products.find((item) => item.Id === id);
  }
}
