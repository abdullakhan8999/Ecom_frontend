import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
let BASE_URL = 'https://ecomm-backend-5fix.onrender.com';
BASE_URL = "http://localhost:4000"

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": BASE_URL
    }
  },
  plugins: [react()],
})
