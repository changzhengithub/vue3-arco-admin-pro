// public store 接口

import type { RouteRecordRaw } from 'vue-router'

export interface UserInfo {
  id: number,
  name: string,
  role: string,
  [key: string]: any
}

export interface EmpowerState {
  token: string,
  userInfo: UserInfo,
  permission: string[],
  routerList: RouteRecordRaw[]
}
