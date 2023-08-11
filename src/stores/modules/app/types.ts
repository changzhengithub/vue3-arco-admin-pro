// app store 接口

interface UserInfo {
  id: number,
  name: string
}

export interface AppState {
  theme: string,
  appName: string,
  hideMenu: boolean,
  userList: UserInfo[]
}
