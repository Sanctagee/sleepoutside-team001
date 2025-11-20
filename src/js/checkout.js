import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, alertMessage } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();

// INDIVIDUAL TASK: Enhanced form submission with error handling
document.querySelector("#checkoutForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  try {
    // Show loading state
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;
    
    console.log("🔄 Starting checkout process...");
    
    // Process checkout
    await checkout.checkout(e.target);
    
    console.log("✅ Checkout completed successfully");
    
  } catch (error) {
    console.error("❌ Checkout failed in main handler:", error);
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Additional error handling (backup)
    if (!error.message.includes('required fields')) {
      alertMessage("Checkout failed. Please check your information and try again.", true);
    }
  }
});

// INDIVIDUAL TASK: Debug logging
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("so-cart") || "[]");
  console.log("🛒 Cart contents for checkout:", cartItems);
  console.log("🔧 CheckoutProcess initialized with enhanced error handling");
});