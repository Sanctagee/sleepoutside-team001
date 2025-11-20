import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();

// Add form submit listener
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
    console.error("❌ Checkout failed:", error);
    
    // Show error message
    alert(`Checkout failed: ${error.message || "Please check your information and try again."}`);
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});