// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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
  const productCategory = urlParams.get(param);
  // return that value, in this case, the product category
  return productCategory;
}

