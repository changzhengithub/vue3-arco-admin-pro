import storage from 'store'
import { defineStore } from 'pinia'
import type { EmpowerState } from './types'
import { ACCESS_TOKEN } from '../../../constants/app'
import { loginApi, infoApi, logoutApi } from '../../../api/empower'
import type { LoginRequestData } from '@/api/empower/types'

export const useEmpowerStore = defineStore('empower', {

  state: (): EmpowerState => ({
    token: '',
    userInfo: {} as UserInfo,
    permission: [], // 权限列表
    routerList: [] // 路由列表
  }),

  getters: {},

  actions: {
    // 登录
    Login(params: LoginRequestData) {
      return new Promise((resolve, reject) => {
        loginApi(params).then(res => {
          const { token, userInfo } = res.data
          storage.set(ACCESS_TOKEN, token)
          this.userInfo = userInfo
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})