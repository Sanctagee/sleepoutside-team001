import { renderListWithTemplate, qs } from "./utils.mjs";

function productCardTemplate(product) {
  console.log("🎨 RENDERIZANDO TEMPLATE para: " + product.Id);
  console.log(
    "   URL da imagem que será usada: " +
      (product.Image ? product.Image.PrimaryMedium : "UNDEFINED"),
  );

  var imageUrl = "../images/placeholder.jpg";

  if (product.Image && product.Image.PrimaryMedium) {
    imageUrl = product.Image.PrimaryMedium;
    console.log("   ✅ Usando URL: " + imageUrl);
  } else {
    console.log("   ❌ Usando placeholder");
  }

  return (
    "<li class='product-card'>" +
    "<a href='../product_pages/index.html?product=" +
    product.Id +
    "'>" +
    "<img src='" +
    imageUrl +
    "' alt='" +
    product.Name +
    "'>" +
    "<h2 class='card__brand'>" +
    (product.Brand ? product.Brand.Name : "No Brand") +
    "</h2>" +
    "<h3 class='card__name'>" +
    (product.NameWithoutBrand || product.Name) +
    "</h3>" +
    "<p class='product-card__price'>$" +
    product.FinalPrice +
    "</p>" +
    "</a>" +
    "</li>"
  );
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  init() {
    var self = this;
    this.dataSource
      .getData(this.category)
      .then(function (products) {
        console.log("🎯 DADOS RECEBIDOS - VERIFICANDO IMAGENS:");

        // Debug detalhado de cada produto
        products.forEach(function (product, index) {
          console.log("📦 Produto " + (index + 1) + " - " + product.Id + ":");
          console.log("   Nome: " + product.Name);
          console.log("   Image object: ", product.Image);
          console.log(
            "   PrimaryMedium: " +
              (product.Image ? product.Image.PrimaryMedium : "UNDEFINED"),
          );
          console.log("---");
        });

        self.products = products;
        self.renderList(self.products);
      })
      .catch(function (error) {
        console.error("❌ Error loading products:", error);
        self.products = [];
        self.renderList(self.products);
      });
  }

  renderList(products) {
    var htmlStrings = products.map(function (product) {
      return productCardTemplate(product);
    });
    this.listElement.innerHTML = htmlStrings.join("");
  }
}
