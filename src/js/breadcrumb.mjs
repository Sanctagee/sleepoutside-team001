function formatName(value) {
    if (!value) return "";
    return value
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// Main function to build breadcrumb
export default function buildBreadcrumb() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const product = params.get("product");

    let breadcrumbHTML = `<a href="index.html">Home</a>`;

    if (!category && !product) {
        document.querySelector(".breadcrumb").style.display = "none";
        return;
    }


    if (category) {
        breadcrumbHTML += ` > <a href="index.html?category=${category}">${formatName(category)}</a>`;
    }

    if (product) {
        breadcrumbHTML += ` > <span>${formatName(product)}</span>`;
    }

    document.querySelector(".breadcrumb").innerHTML = breadcrumbHTML;
}


