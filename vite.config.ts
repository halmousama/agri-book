import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Relative base for GitHub Pages deployment
  base: './',
  server: {
    host: true,
    allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', 'localhost:5173', '.ngrok-free.app'],
  },
  plugins: [react(), tailwindcss(), viteSingleFile()],
})
