import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],

  // ── Dev proxy ──────────────────────────────────────────────────────────────
  // In development, Vite forwards /api/* requests to the local mailer backend
  // running on port 5000. This avoids CORS issues during local development.
  // In production, set VITE_API_URL to your deployed backend URL instead.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
