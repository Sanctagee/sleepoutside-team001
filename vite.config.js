import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
<<<<<<< HEAD
=======
        product: resolve(
          __dirname,
          "src/product_pages/index.html",
        )
>>>>>>> 323693e5c847da4b0f9da173032c3b1ec1b34b79
      },
    },
  },
});
