import { defineConfig } from '@farmfe/core'
import VitePlugin from '../../dist/vite'

export default defineConfig({
  compilation: {
    presetEnv: false,
  },
  vitePlugins: [VitePlugin()],
  server: {
    port: 7999,
  },
})
