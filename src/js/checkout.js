// Import utility function for loading header and footer components
import { loadHeaderFooter } from "./utils.mjs";
// Import CheckoutProcess class for handling checkout operations
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load the header and footer components of the page
loadHeaderFooter();

// Create a new instance of CheckoutProcess, targeting the "so-cart" local storage key and the checkout summary element
const order = new CheckoutProcess("so-cart", ".checkout-summary");
// Initialize the checkout process
order.init();

// Add an event listener to the zip code input field to recalculate the order total when the user leaves the field
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// Add an event listener to the checkout submit button to handle the checkout process
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();
  // Trigger the checkout process when the button is clicked
  order.checkout();
});
