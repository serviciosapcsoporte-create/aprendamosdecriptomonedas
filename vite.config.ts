import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: resolve(__dirname, "app/routes"),
      generatedRouteTree: resolve(__dirname, "app/routeTree.gen.ts"),
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "app"),
      "@assets": resolve(__dirname, "app/assets"),
      "@components": resolve(__dirname, "app/components"),
      "@styles": resolve(__dirname, "app/styles.css"),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
