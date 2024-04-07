import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({ registerType: 'autoUpdate' }),
    vue(),
  ],
  test: {
    environment: 'jsdom',
  },
})
