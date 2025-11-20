import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"; 

// Helper function to convert form data to JSON
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// Helper function to package cart items for checkout
function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrderTotal(); // Call this to display initial totals
  }

  calculateItemSummary() {
    // Calculate item total from cart
    this.itemTotal = this.list.reduce((total, item) => {
      return total + (item.FinalPrice * (item.quantity || 1));
    }, 0);

    // Display item subtotal
    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalElement) {
      subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    // Calculate tax (6% of item total)
    this.tax = this.itemTotal * 0.06;
    
    // Calculate shipping ($10 for first item + $2 for each additional)
    const itemCount = this.list.reduce((count, item) => count + (item.quantity || 1), 0);
    this.shipping = 10 + (Math.max(0, itemCount - 1) * 2);
    
    // Calculate order total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    // Display all totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // Update all total elements
    const elements = {
      '#subtotal': this.itemTotal,
      '#tax': this.tax,
      '#shipping': this.shipping,
      '#orderTotal': this.orderTotal
    };

    Object.entries(elements).forEach(([selector, value]) => {
      const element = document.querySelector(`${this.outputSelector} ${selector}`);
      if (element) {
        element.innerText = `$${value.toFixed(2)}`;
      }
    });
  }

  // NEW: Checkout method for Week 4
  async checkout(form) {
    try {
      console.log('🔄 Starting checkout process...');
      
      // Convert form data to JSON
      const formData = formDataToJSON(form);
      
      // Prepare order object for server
      const order = {
        orderDate: new Date().toISOString(),
        fname: formData.fname,
        lname: formData.lname,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        cardNumber: formData.cardNumber,
        expiration: formData.expiration,
        code: formData.code,
        items: packageItems(this.list),
        orderTotal: this.orderTotal.toFixed(2),
        shipping: this.shipping,
        tax: this.tax.toFixed(2)
      };

      console.log('📦 Order data:', order);

      // Send to server
      const services = new ExternalServices();
      const response = await services.checkout(order);
      
      console.log('✅ Checkout successful:', response);
      
      // Clear cart and redirect to success page
      localStorage.setItem(this.key, JSON.stringify([]));
      window.location.href = '../checkout/success.html';
      
      return response;
    } catch (error) {
      console.error('❌ Checkout failed:', error);
      throw error;
    }
  }
}