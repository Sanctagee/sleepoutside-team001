
import { resolve } from 'path';

export default {
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        productListing: resolve(__dirname, 'src/product_listing/index.html')
      }
    }
  },
  server: {
    port: 5173
  }
}