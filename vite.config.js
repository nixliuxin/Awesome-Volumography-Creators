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
  },
  plugins: [
    {
      name: 'copy-cname',
      closeBundle() {
        // CNAME will be copied via GitHub Actions or manual copy
      }
    }
  ]
});
