import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@emotion/styled": "@emotion/styled",
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
