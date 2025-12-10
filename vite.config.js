import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product1: resolve(
       __dirname, "src/product_pages/index.html"
        ),
        final_project: resolve(
          __dirname,
          "src/final-project/index.html"),
        contact: resolve(
          __dirname,
          "src/final-project/contact.html"),
        tours: resolve(
          __dirname,
          "src/final-project/tours.html"
        ),
        gallery: resolve(
          __dirname,
          "src/final-project/gallery.html"
        ),
        booking: resolve(
          __dirname,
          "src/final-project/booking.html"
        )
        
        
      },

      
    },
  },
});
