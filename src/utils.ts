import ChildProcess from 'node:child_process'
import fs from 'node:fs'
import { pluginName } from '.'
import type { BuildInfo, Options } from './types'
/**
 * 获取当前分支名
 * @param cwd 项目当前目录
 * @returns 无分支则返回空字符，否则返回当前分支名
 */
export const getBranchName = (cwd: string): Promise<string> => {
  return new Promise((resolve) => {
    ChildProcess.exec(
      'git rev-parse --abbrev-ref HEAD',
      { cwd },
      (err, stdout) =>
        resolve(
          err
            ? ''
            : stdout.replace('*', '').replace('\n', '').replace('\n\r', ''),
        ),
    )
  })
}
/**
 * 获取当前分支最后一次提交的Commit Hash前8位
 * @param cwd 项目当前目录
 * @returns 无提交信息则返回空字符串，否则返回Commit Hash后8位
 */
export const getFirstCommitHash8 = (cwd: string): Promise<string> => {
  return new Promise((resolve) => {
    ChildProcess.exec('git log -1 --format=%H', { cwd }, (err, stdout) =>
      resolve(err ? '' : stdout.replace(/\s+$/, '').slice(0, 8)),
    )
  })
}
/**
 * UTC时间转GMT时间
 * @param utcDate
 * @returns
 */
export const utcToGmt = (utcDate: Date) => {
  const timestamp = utcDate.getTime()
  const offset = utcDate.getTimezoneOffset()
  const utcTimestamp = timestamp + offset
  const GmtTimestamp = utcTimestamp + 3600000 * 8

  return new Date(GmtTimestamp)
}
/**
 * 输出黄色的字符串
 * @param str 字符串
 * @returns 返回黄色的字符串
 */
export const yellow = (str: string) => {
  const start = 33
  const end = 39
  const open = `\x1b[${start}m`
  const close = `\x1b[${end}m`
  const regex = new RegExp(`\\x1b\\[${end}m`, 'g')
  return open + str.replace(regex, open) + close
}
export const padStartZero = (num: number) => num.toString().padStart(2, '0')

export const getBuildInfo = async (root: string, options?: Options) => {
  let htmlHeadCloseTag = '</head>'
  try {
    const {
      showName = true,
      showVersion = true,
      nameBlockColor = '#4170FF',
      showTime = true,
      timeBlockColor = '#09b987',
      showGit = true,
      gitBlockColor = '#e19c0e',
    } = options ?? {}

    const pkg = JSON.parse(fs.readFileSync(`${root}/package.json`, 'utf8'))
    const branchName = await getBranchName(root)
    const firstCommitHash8 = await getFirstCommitHash8(root)

    const date = utcToGmt(new Date())
    const time = `${date.getFullYear()}-${padStartZero(
      date.getMonth() + 1,
    )}-${padStartZero(date.getDate())} ${padStartZero(
      date.getHours(),
    )}:${padStartZero(date.getMinutes())}:${padStartZero(date.getSeconds())}`
    const buildInfo: BuildInfo = {
      name: pkg?.name || pluginName,
      version: pkg?.version || '',
      branchName,
      firstCommitHash8,
      time,
    }

    const isShowGit = showGit && (branchName || firstCommitHash8)

    const msg =
      (showName || showVersion ? '%c' : '') +
      (showName ? buildInfo.name : '') +
      (showVersion ? ` v${buildInfo.version}` : '') +
      (showTime ? `%c${buildInfo.time}` : '') +
      (isShowGit
        ? `%c${buildInfo.branchName} ${buildInfo.firstCommitHash8}`
        : '')
    const nameBlock = `background: ${nameBlockColor}; color: #fff; padding: 2px 4px; border-radius: 3px 0 0 3px;`
    const timeBlock = `background: ${timeBlockColor}; color: #fff; padding: 2px 4px;margin-right: -1px;`
    const gitBlock = `background: ${gitBlockColor}; color: #fff; padding: 2px 4px; border-radius: 0 3px 3px 0;`

    const logInfo = `'${msg}'${
      showName || showVersion ? `,'${nameBlock}'` : ''
    }${showTime ? `,'${timeBlock}'` : ''}${isShowGit ? `,'${gitBlock}'` : ''}`

    htmlHeadCloseTag = `<script type="text/javascript">var UNPLUGIN_BUILD_INFO=${JSON.stringify(
      buildInfo,
    )}; console.log(${logInfo});</script></head>`
  } catch (err: any) {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(
      `${yellow(`WARNING[${pluginName}]: `)}${err.message.split('\n')[0]}`,
    )
  }

  return htmlHeadCloseTag
}
