import { defineConfig } from '@rsbuild/core'
import RsbpackPlugin from '../../dist/rspack'

export default defineConfig({
  source: {
    entry: {
      index: '../index.js',
    },
  },
  server: {
    port: 8001,
  },
  tools: {
    rspack: {
      plugins: [RsbpackPlugin()],
    },
  },
})
