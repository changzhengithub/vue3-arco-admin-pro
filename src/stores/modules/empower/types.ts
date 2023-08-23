// public store 接口

import type { RouteRecordRaw } from 'vue-router'

export interface EmpowerState {
  userInfo: UserInfo
  menuPermList: string[]
  operatePermList: string[]
  routerList: RouteRecordRaw[]
}
