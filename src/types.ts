export interface Options {
  html?: string
  showName?: boolean
  showVersion?: boolean
  nameBlockColor?: string
  showTime?: boolean
  timeBlockColor?: string
  showGit?: boolean
  gitBlockColor?: string
}

export interface BuildInfo {
  name: string
  version: string
  branchName: string
  firstCommitHash8: string
  time: string
}
