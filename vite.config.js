import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'gsap': ['gsap']
        }
      }
    },
    minify: 'esbuild',
    cssMinify: true
  },
  server: {
    port: 3000,
    open: true
  }
});
