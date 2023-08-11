// public store 接口

import type { RouteRecordNormalized } from 'vue-router'

export interface UserInfo {
  id: number,
  name: string,
  role: string,
  [key: string]: any
}

export interface PublicState {
  userInfo: UserInfo,
  token: string,
  routerList: RouteRecordNormalized[]
}
