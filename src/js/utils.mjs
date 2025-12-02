// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  // Clear out the element if requested
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Transform each item into HTML using the template function
  const htmlStrings = list.map(templateFn).join("");

  // Insert into the DOM at the specified position
  parentElement.insertAdjacentHTML(position, htmlStrings);
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

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  // if clear is true, we need to clear out the contents of the parent element
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Could not load template: ${path}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading template:", error);
    return "";
  }
}

//loads the header and footer
export async function loadHeaderFooter() {
  try {
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    if (headerElement) {
      const headerTemplate = `
        <div class="logo">
          <img src="/images/noun_Tent_2517.svg" alt="tent image for logo" />
          <a href="/index.html">Sleep<span class="highlight">Outside</span></a>
        </div>
        <div class="cart">
          <a href="/cart/index.html">
            <!-- SVG simplificado ou manter o completo -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="30">
              <!-- SVG do carrinho (pode usar uma versão simplificada) -->
              <path fill="currentColor" d="M18.9 32.6c1.1 2.4 2.5 3.3 5.4 3.3 1.6 0 3.6-0.3 5.9-0.6 3.2-0.5 6.9-1 11.2-1 2.1 0 4.3 0.1 6.4 0.3 2.1 0.1 4.2 0.3 6.1 0.3 3.2 0 5.2-0.4 5.9-1.2 2.7-2.7 2.8-8.8 2.9-14.6 0.1-6.7 0.2-14.5 4.6-18.7 -0.5 0-1 0-1.6 0 -14.2 0-37.5 0-41.1 0C15.6 6.2 14.9 23.6 18.9 32.6z"/>
            </svg>
          </a>
        </div>
      `;
      headerElement.innerHTML = headerTemplate;
    }

    if (footerElement) {
      const footerTemplate = `&copy;2025 ⛺ SleepOutside ⛺ WDD 330 ⛺ BYU-Idaho for BYU-Pathway Worldwide Online`;
      footerElement.innerHTML = footerTemplate;
    }

    // Update cart count in header
    cartCount();
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
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
  if (countElement) {
    if (count > 0) {
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


// INDIVIDUAL TASK: Alert message utility
export function alertMessage(message, scroll = true) {
  // Remove existing alerts
  const existingAlert = document.querySelector('.custom-alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alert = document.createElement('div');
  alert.className = 'custom-alert';
  alert.innerHTML = `
    <div class="alert-content">
      <span class="alert-message">${message}</span>
      <button class="alert-close">&times;</button>
    </div>
  `;

  // Add styles
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #f8d7da;
    color: #721c24;
    padding: 1rem;
    border: 1px solid #f5c6cb;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
  `;

  alert.querySelector('.alert-content').style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  `;

  alert.querySelector('.alert-close').style.cssText = `
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #721c24;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // Add to page
  document.body.appendChild(alert);

  // Close button functionality
  alert.querySelector('.alert-close').addEventListener('click', () => {
    alert.remove();
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove();
    }
  }, 5000);

  // Scroll to top if requested
  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  console.log('📢 Alert displayed:', message);
  return alert;
}