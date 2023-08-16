import { type RouteRecordRaw } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
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

const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/views/user-center/index.vue')
const SystemSetting = () => import(/* webpackChunkName: 'system-setting' */ '@/views/system-setting/index.vue')
const MessageCenter = () => import(/* webpackChunkName: 'message-center' */ '@/views/message-center/index.vue')

export const asyncRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { permission: 'index' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomeComponent,
        meta: { title: '主页', icon: 'icon-list', hidden: false, keepAlive: false, isAuth: true, permission: 'home' }
      },
      {
        path: '/mine',
        name: 'Mine',
        component: MineComponent,
        meta: { title: '我的', icon: 'icon-heart-fill', hidden: false, keepAlive: false, isAuth: true, permission: 'mine' }
      },
      {
        path: '/user-center',
        name: 'UserCenter',
        component: UserCenter,
        meta: { title: '个人中心', icon: '', hidden: true, keepAlive: false, isAuth: false, permission: 'account' }
      },
      {
        path: '/message-center',
        name: 'MessageCenter',
        component: MessageCenter,
        meta: { title: '消息中心', icon: '', hidden: true, keepAlive: false, isAuth: false, permission: 'message_center' }
      },
      {
        path: '/system-setting',
        name: 'SystemSetting',
        component: SystemSetting,
        meta: { title: '系统设置', icon: '', hidden: true, keepAlive: false, isAuth: false, permission: 'message_center' }
      }
    ]
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