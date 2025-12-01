import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ["pruebafront-4kws.onrender.com"], // tu host de Render
  },
  esbuild: {
    format: "esm",
  },
});
