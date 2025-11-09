import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // 1. Obtener los detalles del producto
        this.product = await this.dataSource.findProductById(this.productId);

        // Si no se encuentra el producto, mostrar mensaje de error
        if (!this.product) {
            const container = document.getElementById("product-details");
            if (container) {
                container.innerHTML = `<p style="color:red;">Producto no encontrado. Verifica el enlace o el ID.</p>`;
            }
            return;
        }

        // 2. Renderizar los detalles en el HTML
        this.renderProductDetails();

        // 3. Agregar el event listener al botón "Add to Cart" (después de renderizar)
        const addBtn = document.getElementById("addToCart");
        if (addBtn) {
            addBtn.addEventListener("click", this.addProductToCart.bind(this));
        }
    }

    addProductToCart() {
        let cart = getLocalStorage("so-cart") || [];
        if (!this.product || !this.product.Id) {
            alert("No se pudo agregar el producto. Intenta recargar la página.");
            return;
        }
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alert("¡Producto agregado al carrito!");
    }

    renderProductDetails() {
        const container = document.getElementById("product-details");
        if (!container) return;

        const colores = (this.product.Colors || [])
            .map((c) => c.ColorName)
            .join(", ");

        container.innerHTML = `
      <section class="product-detail">
        <h3>${this.product.Brand?.Name || ""}</h3>

        <h2 class="divider">${this.product.Name || ""}</h2>

        <img
          class="divider"
          src="${this.product.Image || ""}"
          alt="${this.product.Name || ""}"
        />

        <p class="product-card__price">$${this.product.FinalPrice || ""}</p>

        <p class="product__color">${colores}</p>

        <p class="product__description">
          ${this.product.DescriptionHtmlSimple || ""}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id || ""}">
            Add to Cart
          </button>
        </div>
      </section>
    `;
    }
}