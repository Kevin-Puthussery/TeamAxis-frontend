import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
dotenv.config();
export default defineConfig({
  plugins: [react(),tailwindcss()],
  define: {
    'process.env': process.env
  }
})
