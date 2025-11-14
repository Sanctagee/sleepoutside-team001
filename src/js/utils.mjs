
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// this function extracts and returns the value of a query parameter from the page's URL
export function getParam(param) {
  // get the query string part of the current URL (the part after the ?)
  const queryString = window.location.search;

  // create a URLSearchParams object making it convenient to work with the parameters
  const urlParams = new URLSearchParams(queryString);

  // retrieves that value of the named parameter, in this case param
  const product = urlParams.get(param);
  // return that value, in this case, the product
  return product;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true, we need to clear out the contents of the perent
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  
  parentElement.innerHTML = (template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

//loads the header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  // Update cart count in header
  cartCount();
}

// Add a superscript number of items in the cart to the backpack icon in the header
// Create a function to handle counting of items. 

export function cartCount() {
  const cartItems = getLocalStorage("so-cart") || [];

  // Sum the quantity of all items in the cart
  // guard for items that might not have a quantity property (treat as 1)
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Get the DOM element for output
  const countElement = qs(".count-items");

  // If there are items in the cart, show the count; if not, hide the circle
  if(countElement) {
    if(count > 0) {
      // Ensures that the badge is shown when count > 0
      countElement.style.display = "flex";
      // Assign count to the countElement
      countElement.textContent = count;
    } else {
      // Hide badge when count = 0
      countElement.style.display = "none";
    }
  }
}