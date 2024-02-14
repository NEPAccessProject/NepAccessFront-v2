import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
/// <reference types="vite/client" />
const env = loadEnv(path.resolve(__dirname, '.env'), process.env.NODE_ENV);
console.log("🚀 ~ env:", env)
export default defineConfig({
  plugins: [react()],
  build: {},
  preview:{
    host: 'localhost',
    port: 4000,
  },
  server: {
    proxy: {
      "/api":{
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
      },
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
  envPrefix: 'NEPA',
  define: {
    __APP_ENV__: JSON.stringify(env.APP_ENV),

  },

});
