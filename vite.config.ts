import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'prop-types': path.resolve(__dirname, 'node_modules/prop-types/index.js')
    },
  },
  optimizeDeps: {
    include: ['prop-types']
  },
  server: {
    port: 5179,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'prop-types']
        }
      }
    }
  },
});
