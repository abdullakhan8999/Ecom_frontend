import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
let BASE_URL = 'https://ecomm-backend-5fix.onrender.com';
// BASE_URL = "http://localhost:4000"

export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://ecomm-backend-5fix.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      }
    }
  },
  plugins: [react()],
})
