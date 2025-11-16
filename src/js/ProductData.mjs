const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
  }
  
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result; 
    } catch (error) {
      console.error("Error fetching product data:", error);
      return [];
    }
  }
  
  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      // FIX: Extract product from Result object
      return data.Result || data; // Handle both structures
    } catch (error) {
      console.error("Error finding product:", error);
      return null;
    }
  }
}