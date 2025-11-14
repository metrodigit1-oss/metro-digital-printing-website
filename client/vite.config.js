import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // --- ADD THIS SERVER CONFIG ---
  server: {
    proxy: {
      // Proxy all requests starting with '/api'
      '/api': {
        target: 'http://localhost:3000', // The address of your API server
        secure: false, // Set to true if your API is on https
      },
    },
  },
  // -----------------------------
  plugins: [react()],
})