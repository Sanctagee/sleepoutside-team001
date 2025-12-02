const baseURL = import.meta.env.VITE_SERVER_URL;

import { convertToJson } from './utils.mjs';

export default class ProductData {
  constructor() {

  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
   async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
