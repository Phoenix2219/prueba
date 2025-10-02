import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      animejs: "animejs/lib/anime.es.js",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  define: {
    __API__: JSON.stringify(
      process.env.NODE_ENV === "production"
        ? "https://tu-backend-production.up.railway.app" // Railway
        : "" // en dev se resuelve por proxy
    ),
  },  
})
