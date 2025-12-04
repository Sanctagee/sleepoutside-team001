// Retrieve the base URL for the server from environment variables
const baseURL = import.meta.env.VITE_SERVER_URL;

// Utility function to convert fetch response to JSON or throw an error if the response is not OK
function convertToJson(res) {
  if (res.ok) {
    // Return the response parsed as JSON if the request was successful
    return res.json();
  } else {
    // Throw an error for unsuccessful responses
    throw { name: "servicesError", message: res.statusText };
  }
}
// Define a class to handle external API services for product and checkout operations
export default class ExternalServices {
  constructor() {
    // Constructor is empty but could be used to initialize category or path (commented code)
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }

  // Fetch product data for a specific category from the server
  async getData(category) {
    // Make a GET request to the server using the category endpoint
    const response = await fetch(`${baseURL}products/search/${category}`);
    // Convert the response to JSON using the utility function
    const data = await convertToJson(response);
    // Return the 'Result' property from the response data
    return data.Result;
  }

  // Fetch a single product by its ID from the server
  async findProductById(id) {
    // Make a GET request to the server using the product ID endpoint
    const response = await fetch(`${baseURL}product/${id}`);
    // Convert the response to JSON using the utility function
    const data = await convertToJson(response);
    // Return the 'Result' property from the response data
    return data.Result;
  }

  // Send checkout data to the server for processing
  async checkout(payload) {
    // Define options for the POST request, including headers and JSON-stringified payload
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    // Make a POST request to the checkout endpoint and convert the response to JSON
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}