import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },


  base: "/escalation_matrix",
  server: {
    configureServer: ({ middlewares }) => {
      middlewares.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
      });
    },
  },
});
