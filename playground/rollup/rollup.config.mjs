import html from '@rollup/plugin-html'
import RollupPlugin from '../../dist/rollup.js'

export default {
  input: '../index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [html({ title: 'rollup' }), RollupPlugin()],
}
