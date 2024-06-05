import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import { getBuildInfo } from './utils'
import { webpackCompiler } from './webpack'

export const pluginName = 'unplugin-build-info'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
) => {
  const { html = 'index.html' } = options ?? {}
  const root = process.cwd()
  let htmlHeadCloseTag = ''

  return {
    name: pluginName,
    async buildStart() {
      htmlHeadCloseTag = await getBuildInfo(root, options)
    },
    async webpack(compiler) {
      if (!htmlHeadCloseTag) {
        htmlHeadCloseTag = await getBuildInfo(root, options)
      }
      webpackCompiler(compiler, htmlHeadCloseTag, html)
    },
    async rspack(compiler) {
      if (!htmlHeadCloseTag) {
        htmlHeadCloseTag = await getBuildInfo(root, options)
      }
      webpackCompiler(compiler, htmlHeadCloseTag, html)
    },
    vite: {
      async transformIndexHtml(html) {
        return html.replace('</head>', htmlHeadCloseTag)
      },
    },
    rollup: {
      async generateBundle(_: unknown, bundle: any) {
        if (bundle[html]) {
          bundle[html].source = bundle[html].source.replace(
            '</head>',
            htmlHeadCloseTag,
          )
        }
      },
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
