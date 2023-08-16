/**
 ** 路由权限控制 **
 * 监听每次路由跳转，进行过滤和筛选路由
 */

 import storage from 'store'
 import router from '@/router'
 import store from '@/store'
 import { ACCESS_TOKEN } from '@/constants/app'
 
 import Notification from '@arco-design/web-vue/es/notification'
 import NProgress from 'nprogress' // progress bar
 import 'nprogress/nprogress.css'
 NProgress.configure({
   showSpinner: false
 }) // NProgress Configuration
 
 
 
 const whiteList = ['Empower', 'DingdingTip'] // no redirect whitelist
 const loginRoutePath = '/empower'
 const defaultRoutePath = '/home'
 
 router.beforeEach((to, from, next) => {
   NProgress.start() // start progress bar
 
   // 设置系统标题
   if (to.meta && to.meta.title) {
     const domTitle = '综合OA';
     document.title = to.meta.title + '-' + domTitle;
   }
 
   /* has token */
   if (storage.get(ACCESS_TOKEN)) {
     if (to.path === loginRoutePath) {
       next({ path: defaultRoutePath })
       NProgress.done()
     } else {
       // 判断是否有页面权限
       if (!store.state.menu_perm.length) {
         // request login userInfo
         store
           .dispatch('GetInfo')
           .then((menu_perm) => {
             store.dispatch('FilterRoutes', { menu_perm }).then(() => {
               const { routerList } = store.state;
               // 动态添加可访问路由表
               routerList.forEach(item => {
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
     if (whiteList.includes(to.name)) {
       // 在免登录白名单，直接进入
       next()
     } else {
       next({ path: loginRoutePath, query: { redirect: to.fullPath } })
       NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
     }
   }
 })
 
 router.afterEach(() => {
   NProgress.done() // finish progress bar
 })