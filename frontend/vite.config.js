import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx)$/,
    }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:65534',
        changeOrigin: true,
        secure: false
      }
    }
  }
})