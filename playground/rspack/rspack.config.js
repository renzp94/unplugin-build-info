const rspack = require('@rspack/core')
const path = require('node:path')
const RsbpackPlugin = require('../../dist/rspack.cjs')

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: path.resolve(__dirname, '../index.js'),
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      title: 'rspack',
    }),
    RsbpackPlugin.default(),
  ],
  devServer: {
    port: 8002,
  },
}
