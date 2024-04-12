import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon-180x180.png',
        'maskable-icon-512x512.png',
        'logo.svg',
      ],
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#171717',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    vue(),
  ],
  test: {
    environment: 'jsdom',
  },
})
