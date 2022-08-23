import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from "path"

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
      "apis": path.resolve(__dirname, "./src/apis"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "components": path.resolve(__dirname, "./src/components"),
      "@app": path.resolve(__dirname, "./src")
    }
  },
  // base: "/solidjs-simple-ecommerce/",
  build: {
    target: 'esnext',
  },
});
