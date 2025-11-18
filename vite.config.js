import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
<<<<<<< HEAD
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product_pages: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve (__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
=======
        main: resolve(__dirname, 'src/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        productListing: resolve(__dirname, 'src/product_listing/index.html')
      }
    }
  }
})
>>>>>>> wpl--individual3
