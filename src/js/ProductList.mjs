import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
        <li class="product-card">
        <a href="product_pages/?products=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}">
            <h2>${product.Brand.Name}</h2>
            <h3>${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
        </li>
    `;
}

export default class ProductList {
    constructor(productCategory, dataSource, listElement) {
        this.productCategory = productCategory;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();

        this.renderList(list);
    }

    renderList(list) {
        //First renderList
        //const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}






// function productCardTemplate(product) {
//     return `<li class="product-card">
//     <a href="product_pages/?product=">
//       <img src="" alt="Image of ">
//       <h2 class="card__brand"></h2>
//       <h3 class="card__name"></h3>
//       <p class="product-card__price">$</p>
//     </a>
//   </li>`
// }

// export default class ProductList {
//     constructor(productCategory, dataSource, listElement) {
//         this.productCategory = productCategory;
//         this.dataSource = dataSource;
//         this.listElement = listElement;
//     }

//     async init() {
//         const list = await this.dataSource.getData(this.productCategory);

//         this.renderList(list);
//         document.querySelector("h2").innerHTML = "Top Products: " + this.productCategory;
//     }

//     renderList(list) {
//         const htmlStrings = list.map(productCardTemplate);
//         this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
//     }
// }
