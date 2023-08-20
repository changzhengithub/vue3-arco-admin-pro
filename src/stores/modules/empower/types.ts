// public store 接口

import type { RouteRecordRaw } from 'vue-router'

export interface UserInfo {
  id: number
  name: string
  role: string
  [key: string]: any
}

export interface EmpowerState {
  userInfo: UserInfo
  menuPermList: string[]
  operatePermList: string[]
  routerList: RouteRecordRaw[]
}
