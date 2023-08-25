// app store 接口

export interface AppState {
  version: string
  appName: string
  hideMenu: boolean
  [key: string]: unknown
}
