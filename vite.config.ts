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
    rollupOptions: {
      output: {
        // Separa el vendor del codigo de la app: el bundle de framework cambia
        // mucho menos que las lecciones, asi que se reutiliza de cache entre
        // despliegues y el navegador no lo reparsea en cada visita.
        manualChunks: {
          react: ["react", "react-dom", "react-dom/client"],
          tanstack: [
            "@tanstack/react-router",
            "@tanstack/router-core",
            "@tanstack/history",
            "@tanstack/react-query",
          ],
        },
      },
    },
  },
});
