import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

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
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    this.itemTotal = this.list.reduce((total, item) => {
      return total + (item.FinalPrice * (item.quantity || 1));
    }, 0);

    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalElement) {
      subtotalElement.innerText = this.itemTotal.toFixed(2);
    }
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    
    const itemCount = this.list.reduce((count, item) => count + (item.quantity || 1), 0);
    this.shipping = 10 + (Math.max(0, itemCount - 1) * 2);
    
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const elements = {
      '#subtotal': this.itemTotal,
      '#tax': this.tax,
      '#shipping': this.shipping,
      '#orderTotal': this.orderTotal
    };

    Object.entries(elements).forEach(([selector, value]) => {
      const element = document.querySelector(`${this.outputSelector} ${selector}`);
      if (element) {
        element.innerText = value.toFixed(2);
      }
    });
  }

  // INDIVIDUAL TASK: Enhanced checkout with error handling
  async checkout(form) {
    try {
      console.log('🔄 Starting checkout process...');
      
      // Convert form data to JSON
      const formData = formDataToJSON(form);
      
      // INDIVIDUAL TASK: Form validation
      if (!this.validateFormData(formData)) {
        throw new Error('Please fill in all required fields correctly.');
      }

      // Prepare order object
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

      console.log('📦 Sending order data:', order);

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
      
      // INDIVIDUAL TASK: Enhanced error handling
      this.handleCheckoutError(error);
      throw error;
    }
  }

  // INDIVIDUAL TASK: Form validation method
  validateFormData(formData) {
    const requiredFields = ['fname', 'lname', 'street', 'city', 'state', 'zip', 'cardNumber', 'expiration', 'code'];
    
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        console.error(`❌ Missing required field: ${field}`);
        return false;
      }
    }
    
    // Basic validation for test card
    if (formData.cardNumber !== '1234123412341234') {
      console.warn('⚠️ Using non-test credit card number');
    }
    
    console.log('✅ Form validation passed');
    return true;
  }

  // INDIVIDUAL TASK: Enhanced error handling method
  handleCheckoutError(error) {
    let errorMessage = 'Checkout failed. Please try again.';
    
    if (error.name === 'servicesError') {
      errorMessage = error.message.detail || 'Server error occurred. Please check your information.';
      console.error('🚨 Server Error:', error.message);
    } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
      errorMessage = 'Network error. Please check your connection and try again.';
      console.error('🚨 Network Error:', error.message);
    } else if (error.message.includes('required fields')) {
      errorMessage = 'Please fill in all required fields.';
      console.error('🚨 Validation Error:', error.message);
    } else {
      console.error('🚨 Unknown Error:', error);
    }
    
    // Use alertMessage utility
    if (typeof alertMessage === 'function') {
      alertMessage(errorMessage, true);
    } else {
      // Fallback to basic alert
      alert(errorMessage);
    }
  }
}