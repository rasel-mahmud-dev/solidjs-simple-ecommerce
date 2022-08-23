import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  base: "/solidjs-simple-ecommerce/",
  build: {
    target: 'esnext',
  },
});
