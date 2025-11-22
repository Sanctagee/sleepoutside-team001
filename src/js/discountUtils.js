function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function createDiscountBadge(percent) {
  const badge = document.createElement("span");
  badge.className = "discount-indicator";
  badge.textContent = `-${percent}% OFF`;
  return badge;
}

export function updateProductCards(products) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const name = card.querySelector(".card__name").textContent.trim();
    const brand = card.querySelector(".card__brand").textContent.trim();
    const product = products.find(
      (p) => p.NameWithoutBrand === name && p.Brand.Name === brand
    );
    if (!product) return;
    const priceElem = card.querySelector(".product-card__price");
    if (product.FinalPrice < product.SuggestedRetailPrice) {
      // Calculate discount percent
      const percent = Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      );
      // Add badge
      priceElem.parentElement.insertBefore(
        createDiscountBadge(percent),
        priceElem
      );
      // Show old price with strikethrough
      const oldPrice = document.createElement("span");
      oldPrice.className = "old-price";
      oldPrice.textContent = formatPrice(product.SuggestedRetailPrice);
      priceElem.innerHTML = `<span class="new-price">${formatPrice(
        product.FinalPrice
      )}</span>`;
      priceElem.insertBefore(oldPrice, priceElem.firstChild);
    } else {
      priceElem.textContent = formatPrice(product.FinalPrice);
    }
  });
}