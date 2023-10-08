/**
 ** 路由权限控制 **
 * 监听每次路由跳转，进行过滤和筛选路由
 */

import storage from 'store'
import router from '@/router'
import { useEmpowerStore } from '@/stores/modules/empower'
import { constantRouterMap } from '@/router/router.config'
import { ACCESS_TOKEN } from '@/constants/app'
import defaultSetting from '@/config/settings'

import Notification from '@arco-design/web-vue/es/notification'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import type { RouteRecordName } from 'vue-router'
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration



const whiteList: RouteRecordName[] = constantRouterMap.filter(item => item.meta && item.meta.isWhite).map(el => el.name as RouteRecordName) // 白名单
const empowerList: RouteRecordName[] = ['Empower'] // 授权页面
const loginRoutePath = '/empower'

router.beforeEach((to, from, next) => {
  NProgress.start()

  // 获取store
  const empowerStore = useEmpowerStore()

  // 设置系统标题
  if (to.meta && to.meta.title) {
    const domTitle = defaultSetting.appName
    document.title = to.meta.title + '-' + domTitle
  }

  // 判断是否在白名单内
  if (whiteList.includes(to.name as RouteRecordName)) {
    next()
  } else {
    // 判断是否登录
    if (storage.get(ACCESS_TOKEN)) {
      if (empowerList.includes(to.name as RouteRecordName)) {
        next({ path: '/' })
        NProgress.done()
      } else {
        // 判断是否有页面权限
        if (!empowerStore.menuPermList.length) {
          // 获取登录信息
          empowerStore.getUserInfo()
            .then(() => {
              empowerStore.filterRoutes()
                .then(() => {
                  // 动态添加可访问路由表
                  empowerStore.routerList.forEach(item => {
                    router.addRoute(item)
                  })
                  // 必要，要不然会死循环
                  next({ ...to, replace: true })
                })
            })
            .catch(() => {
              Notification.error({
                title: '错误',
                content: '请求用户信息失败，请重试'
              })
              // 失败时，清空历史保留信息
              storage.clearAll()
              window.location.reload()
            })
        } else {
          next()
        }
      }
    } else {
      // 是授权页面，直接进入
      if (empowerList.includes(to.name as RouteRecordName)) {
        next()
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath } })
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})