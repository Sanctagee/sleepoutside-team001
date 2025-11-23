import { renderListWithTemplate, qs, addProductToCart, getDiscountBadge } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
    <h2 class="card__brand">${product.Brand.Name}</h2>
    <h3 class="card__name">${product.NameWithoutBrand}</h3>
    <p class="product-card__price"><span class="product_discount">$${product.FinalPrice}</span></p>
    </a>

    <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
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

        this.addQuickViewListeners(list);
    }

    // Quick view modal
    addQuickViewListeners(list) {
    const quickViewBtns = document.querySelectorAll(".quick-view-btn");
    const modal = qs(".quick-view-modal");
    const modalCard = modal.querySelector(".quick-view-card");
    const closeBtn = qs(".close-btn");

    quickViewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const product = list.find((p) => p.Id == btn.dataset.id);

        // NEW: Added this block of code for the discountBadge in the product_listing landing page and the modal
        const discountBadge = getDiscountBadge(product);
        let priceHtml = `<p class="product-card__price">$${product.FinalPrice}</p>`;
        if (discountBadge) {
          priceHtml = `<p class="product-card__price"><span style='text-decoration:line-through;color:#888;'>$${product.SuggestedRetailPrice}</span> <span style='color:#d32f2f;font-weight:bold;'>$${product.FinalPrice}</span></p>`;
        }
        modalCard.innerHTML = `
          <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
          <h3>${product.Brand.Name}</h3>
          <p>${product.NameWithoutBrand}</p>
          <p>${priceHtml}</p>
          <p style="margin-top: -2em;">${discountBadge}</p>
          <p><strong>Color:</strong> ${product.Colors[0]?.ColorName}</p>
          <div class="quick-view-desc">
            ${product.DescriptionHtmlSimple}
          </div>
        `;

        // Open modal
        modal.classList.add("open");

        // Handle Add To cart
        document.getElementById("quickViewAddToCart").onclick = () => {
          addProductToCart(product);
          modal.classList.remove("open");
        };
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });

    // Close modal on overlay click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });
  }

    renderList(list) {
        // Clear existing content
        this.listElement.innerHTML = "";
        renderListWithTemplate(productCardTemplate, this.listElement, list);

        list.forEach(product => {
            const badgeHTML = getDiscountBadge(product);
            if(badgeHTML) {
                const card = this.listElement.querySelector(`[data-id="${product.Id}"]`).closest(".product-card");
                const discountPlaceholder = card.querySelector(".product_discount");
                if(discountPlaceholder) {
                  discountPlaceholder.insertAdjacentHTML("afterend", badgeHTML);
                }
            }
        });
    }

    updatePageTitle() {
        const titleElement = document.querySelector("h2");
        if (titleElement && this.category) {
            titleElement.textContent = `Top Products: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
        }
    }
}