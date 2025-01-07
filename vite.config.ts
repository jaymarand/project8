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
    dedupe: ['react', 'react-dom', 'prop-types']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['prop-types']
        }
      }
    }
  },
  server: {
    port: 5179,
    open: true,
  },
  optimizeDeps: {
    include: ['prop-types']
  },
  outDir: 'dist',
  assetsDir: 'assets',
  sourcemap: true,
});
