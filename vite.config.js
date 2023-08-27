import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const BASE_URL = 'https://ecomm-backend-5fix.onrender.com';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": BASE_URL
    }
  },
  plugins: [react()],
})
