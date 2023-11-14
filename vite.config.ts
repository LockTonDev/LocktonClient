import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import cors from 'cors';

// import { fs } from 'fs';
const domain = 'localhost'; // add it

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        //target: 'http://13.209.15.41:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Resource-Policy': 'same-site',
      'Access-Control-Allow-Origin': '*'
    },
    host: domain,
    hmr: {
      host: domain
    },
    cors : true,
  },

  // server: {
  //   https: {
  //     // key: fs.readFileSync('./src/ssl/key.pem'),
  //     // cert: fs.readFileSync('./src/ssl/cert.pem')
  //     // ca: fs.readFileSync('./src/ssl/ca-chain-bundle.pem')
  //   },
  //   host: domain,
  //   hmr: {
  //     host: domain
  //   }
  // },
  css: {
    preprocessorOptions: {
      scss: { charset: false },
      css: { charset: false }
    }
  }
});
