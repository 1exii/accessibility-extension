import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Points to index.html in the root
        main: resolve(__dirname, 'index.html'),
        // Points to your scripts now moved to src
        background: resolve(__dirname, 'public/background.js'),
        offscreen: resolve(__dirname, 'public/offscreen.js'),
      },
      output: {
        // Ensures the output files are named background.js and offscreen.js
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      },
    },
  },
});