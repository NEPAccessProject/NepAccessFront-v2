import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert' //used for https on local

/// <reference types="vite/client" />
/// <reference types="vitest" />

const env = loadEnv(path.resolve(__dirname, '.env'), process.env.NODE_ENV);
console.log("🚀 ~ env:", env)
export default defineConfig({
  plugins: [
    react(),
   //mkcert(),
  ],
  build: {},
  preview:{
    host: 'localhost',
    port: 4000,
  },
  server: {
    hmr: {
      host: 'localhost',
      port: 4000,
      clientPort: 4000,
    },
    host: 'localhost',
    strictPort:true,
    port:  4000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  //envPrefix: 'NEPA',
  define: {
    __APP_ENV__: JSON.stringify(env.APP_ENV),
    API_HOST : JSON.stringify(env.API_HOST),
    API: env.API_HOST,
  },

});