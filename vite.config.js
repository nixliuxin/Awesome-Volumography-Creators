import { defineConfig } from 'vite';

export default defineConfig({
  root: 'website',
  base: '/',
  publicDir: false,
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'website/index.html'
    }
  }
});
