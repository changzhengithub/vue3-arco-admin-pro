import storage from 'store'
import { defineStore } from 'pinia'
import { ACCESS_TOKEN } from '../../../constants/app'
import { loginApi, infoApi } from '@/api/empower'
import { asyncRouterMap } from '@/router/router.config'
import permissionList from '@/json/permission.json'

import type { RouteRecordRaw } from 'vue-router'
import type { EmpowerState } from './types'
import type { LoginRequestData, LoginResponseData } from '@/api/empower/types'

export const useEmpowerStore = defineStore('empower', {

  state: (): EmpowerState => ({
    userInfo: {} as UserInfo,
    routerList: [], // 路由列表
    menuPermList: [], // 路由权限列表
    operatePermList: [] // 操作权限列表
  }),

  getters: {},

  actions: {
    // 登录
    userLogin(params: LoginRequestData) {
      return new Promise<LoginResponseData>((resolve, reject) => {
        loginApi(params).then(res => {
          const { token, userInfo } = res.data
          storage.set(ACCESS_TOKEN, token)
          this.userInfo = userInfo
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        infoApi().then(res => {
          const data = res.data
          this.userInfo = data
          // 获取权限列表
          const { id, menu_perm, operate_perm } = data
          // id为1获取所有权限
          let menuList = []
          let operateList = []
          // 超级管理员有所有权限
          if (id === 1) {
            menuList = this.getAllPermList()
            operateList = this.getAllOperateList()
          } else {
            menuList = menu_perm || []
            operateList = operate_perm || []
          }
          this.menuPermList = menuList
          this.operatePermList = operateList
          if (menuList.length) {
            resolve(menuList)
          } else {
            reject(new Error('角色必须是非空数组!'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据权限列表过滤对应路由
    filterRoutes() {
      return new Promise((resolve, reject) => {
        const routerList = this.filterAsyncRouter(asyncRouterMap, this.menuPermList)
        console.log(routerList)
        routerList.push({
          path: '/:catchAll(.*)',
          redirect: '/exception'
        })
        if (routerList.length > 1) {
          this.routerList = routerList
          resolve(routerList)
        } else {
          reject(new Error('无法获取该用户角色，请重新登录!'))
        }
      })
    },

    // 根据权限列表过滤路由
    filterAsyncRouter(routerMap: RouteRecordRaw[], menu_perm: string[]) {
      const routerList = routerMap.filter(route => {
        if (route.meta) {
          const { isAuth, permission } = route.meta
          if (!isAuth || menu_perm.includes(permission as string)) {
            if (route.children && route.children.length) {
              route.children = this.filterAsyncRouter(route.children, menu_perm)
              console.log(route.children)
              // 如果有子路由重定向到第一个
              if (route.children.length) route.redirect = route.children[0].path
            }
            return true
          }
        } else {
          return true
        }
        return false
      })
      return routerList
    },

    /**
     * 获取所有权限列表
     * */
    getAllPermList() {
      const allMenuList = permissionList.flatMap(item => item.permList).map(el => el.perm)
      const menu_perm = [...new Set(allMenuList)]
      return menu_perm
    },

    /**
     * 获取所有操作权限列表
     * */
    getAllOperateList() {
      const operateList = permissionList.flatMap(item => item.operateList)
      const operate_perm = operateList.map(item => item.perm)
      return operate_perm
    }
  }
})