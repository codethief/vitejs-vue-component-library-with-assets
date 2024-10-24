import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    // Workaround for https://github.com/vitejs/vite/issues/18034
    assetsInlineLimit: (filePath, content) => {
      if (filePath.endsWith('.svg') || filePath.endsWith('?url')) {
        return false;
      } else {
        // 4096 is the default threshold as per https://vite.dev/config/build-options.html#build-assetsinlinelimit
        return content.length < 4096;
      }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
