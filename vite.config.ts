import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Interquill',
        short_name: 'Interquill',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' }
        ],
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone'
      }
    })
  ],
  server: {
    port: 3000
  }
})
