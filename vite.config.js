import { defineConfig } from 'vite';

export default defineConfig({
  root: 'website',
  base: '/',
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'website/index.html'
    }
  }
});
