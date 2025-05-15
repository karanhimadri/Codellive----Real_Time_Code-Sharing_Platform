import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 this allows access from LAN devices
    port: 5173  // optional: explicitly set the port
  }
})
