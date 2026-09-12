import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['localhost', '.ngrok-free.app'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Mapbox, MapLibre, and Firebase are each well over Vite's 500 kB default.
    chunkSizeWarningLimit: 2000,
  },
  publicDir: 'public',
});
