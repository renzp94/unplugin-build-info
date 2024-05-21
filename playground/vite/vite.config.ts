import { defineConfig } from 'vite'
import VitePlugin from '../../src/vite'

export default defineConfig({
  plugins: [VitePlugin()],
  server: {
    port: 8003,
  },
})
