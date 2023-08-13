// import { RouteView, BasicLayout } from '@/layouts'

/**
 * @desc 权限路由
 * @desc 走导航的路由都在根路由/里，走BasicLayout基础布局
 * @desc 不走导航的和根路由/放在同级或者放在根路由里加上hidden:true
 * @desc 不需登录的放在基础路由constantRouterMap里，并放在权限控制的白名单里才不会走权限验证
 * @desc keepAlive是否缓存该组件，缓存必须在每一层router-view加keep-alive才会生效
 * */

const Empower = () => import(/* webpackChunkName: 'empower' */ '@/views/empower/index.vue')
const Exception = () => import(/* webpackChunkName: 'exception' */ '@/views/exception/index.vue')

const HomeComponent = () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
const MineComponent = () => import(/* webpackChunkName: 'mine' */ '@/views/mine/index.vue')

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
    meta: { title: '主页', icon: 'favorites', keepAlive: false, isAuth: true, permission: 'home' }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: MineComponent
  }
]

// 基础路由
export const constantRouterMap = [
  {
    path: '/empower',
    name: 'Empower',
    component: Empower
  },
  // 异常处理
  {
    path: '/exception',
    name: 'Exception',
    component: Exception
  }
]