<p align="center"><a href="https://github.com/renzp94/unplugin-build-info" target="_blank" rel="noopener noreferrer"><img width="200" src="./logo.png" alt="unplugin-build-info logo"></a></p>
<p align="center">
  <a href="https://npmcharts.com/compare/@renzp/unplugin-build-info?minimal=true"><img src="https://img.shields.io/npm/dm/@renzp/unplugin-build-info.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@renzp/unplugin-build-info"><img src="https://img.shields.io/npm/v/@renzp/unplugin-build-info.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@renzp/unplugin-build-info"><img src="https://img.shields.io/npm/l/@renzp/unplugin-build-info.svg?sanitize=true" alt="License"></a>
</p>
<p align="center">
  <a href="https://github.com/renzp94/unplugin-build-info/watchers"><img src="https://img.shields.io/github/watchers/renzp94/unplugin-build-info.svg?style=social" alt="watchers"></a>
  <a href="https://github.com/renzp94/unplugin-build-info/stars"><img src="https://img.shields.io/github/stars/renzp94/unplugin-build-info.svg?style=social" alt="stars"></a>
</p>

# @renzp/unplugin-build-info

一款将打包信息打印在控制台上的插件。

![demo.png](./demo.png)

支持框架：

- `webpack4/webpack5`
- `vite`
- `rollup`
- `rspack`
- `rsbuild`
- `farm`

## Install

```sh
npm i @renzp/unplugin-build-info -D 
```

## Usage

### webpack

```ts
// webpack.config.ts
import BuildInfoWebpackPlugin from '@renzp/unplugin-build-info/webpack'

export default {
  plugins: [BuildInfoWebpackPlugin()]
}
```

### vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import BuildInfoVitePlugin from '@renzp/unplugin-build-info/vite'

export default defineConfig({
  plugins: [BuildInfoVitePlugin()],
})
```

### rspack

```js
// rspack.config.js
const BuildInfoRspackPlugin = require('@renzp/unplugin-build-info/rspack')

module.exports = {
  plugins: [BuildInfoRspackPlugin.default()]
}
```

### rsbuild

```ts
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import BuildInfoRspackPlugin from '@renzp/unplugin-build-info/rspack'

export default defineConfig({
  tools: {
    rspack: {
      plugins: [BuildInfoRspackPlugin()],
    },
  },
})
```

### rollup

```js
// rollup.config.mjs
import BuildInfoRollupPlugin from '@renzp/unplugin-build-info/rollup'

export default {
  plugins: [BuildInfoRollupPlugin()],
}
```

### farm

```ts
// farm.config.ts
import { defineConfig } from '@farmfe/core'
import BuildInfoVitePlugin from '@renzp/unplugin-build-info/vite'

export default defineConfig({
  vitePlugins: [BuildInfoVitePlugin()],
})
```

如果使用的html模板名字不是`index.html`，则可通过`html`参数指定模板名称(vite插件不需要此参数)。注意是文件名称，不是文件路径。

例如：
  - html模板文件路径为：`./src/html/index.html`，则无需指定。
  - html模板文件路径为：`./src/html/app.html`，则需要指定`html: 'app.html'`

> 原因：内部通过匹配资源文件名来进行查找html文件的，默认为index.html，如果不是则需要指定。

```js
import BuildInfoWebpackPlugin from '@renzp/unplugin-build-info/webpack'

export default {
    plugins: [BuildInfoWebpackPlugin({ html: 'app.html'})]
}
```

### Options

```ts
interface Options {
  // html模板文件，默认为index.html，如果使用的html模板不是index.html，则可以使用该选项指定模板文件名称
  html?: string
  // 是否显示项目名称(package.name)
  showName?:boolean
  // 是否显示项目版本号(package.version)
  showVersion?:boolean
  // 项目名称样式
  nameBlockColor?: string
  // 是否显示打包时间
  showTime?:boolean
  // 打包时间样式
  timeBlockColor?: string
  // 是否显示git信息
  showGit?:boolean
  // git信息样式
  gitBlockColor?: string
}
```