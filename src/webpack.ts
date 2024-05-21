import type { Compiler as RsCompiler } from '@rspack/core'
import { createWebpackPlugin } from 'unplugin'
import type { Compiler } from 'webpack'
import webpackSources from 'webpack-sources'
import { pluginName, unpluginFactory } from '.'
import { yellow } from './utils'

export default createWebpackPlugin(unpluginFactory)

export const webpackCompiler = (
  compiler: Compiler | RsCompiler,
  htmlHeadCloseTag: string,
  html = 'index.html',
) => {
  compiler.hooks.emit.tap(pluginName, async (compilation: any) => {
    if (!compilation.assets[html]) {
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      console.log(
        `${yellow(
          `WARNING[${pluginName}]: `,
        )}未找到${html}文件，如果html模板不是index.html，请在options中指定`,
      )
    }

    let htmlContent = compilation.assets[html].source() as string

    htmlContent = htmlContent.replace('</head>', htmlHeadCloseTag)
    compilation.assets[html] = new webpackSources.RawSource(htmlContent)
  })
}
