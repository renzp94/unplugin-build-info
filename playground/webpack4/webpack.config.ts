import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackPlugin from '../../src/webpack'

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../index.js'),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      title: 'webpack4',
    }),
    WebpackPlugin(),
  ],
  devServer: {
    port: 8004,
  },
}
