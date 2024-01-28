import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import * as path from 'path';
/// <reference types="vite/client" />

export default defineConfig({
  plugins: [react()],
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
    host: process.env.NEPA_HOST || 'localhost',
    port: parseInt(process.env.NEPA_PORT) || 4000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  envPrefix: 'NEPA',
  define: {
    __VALUE__: `${process.env.VALUE}`,
  }

});
