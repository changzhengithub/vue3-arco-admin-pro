import { shallowRef } from 'vue'
import BasicLayout from '@/layouts/BasicLayout.vue'
import { type RouteRecordRaw } from 'vue-router'

/**
 * @desc 权限路由表
 * 路由分为需要登录的不需要登录的
 * 不需要登录的为白名单放在基础路由里，如登录、注册、活动页，需要登录的放在权限路由里，
 * 需要登录的又分为需要权限控制和不需要权限控制的，通过meta字段isAuth进行判断需不需要权限判断
 * 在导航栏显示的路由统一放在根路由下走基础布局
 * 不在导航栏显示的可以放在根路由外面走其他布局，比如个人中心
 * 或者在根路由走基础布局，通过hidden自动控制，比如详情页
 * keepAlive是否缓存该组件，缓存必须在每一层router-view加keep-alive才会生效
 * permission为权限id，全局必须保持唯一
 * */

const Empower = () => import(/* webpackChunkName: 'empower' */ '@/views/empower/index.vue')
const Promotion = () => import(/* webpackChunkName: 'promotion' */ '@/views/promotion/index.vue')
const Exception = () => import(/* webpackChunkName: 'exception' */ '@/views/exception/index.vue')

const HomeComponent = () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
const MineComponent = () => import(/* webpackChunkName: 'mine' */ '@/views/mine/index.vue')

const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/views/user-center/index.vue')
const SystemSetting = () => import(/* webpackChunkName: 'system-setting' */ '@/views/system-setting/index.vue')
const MessageCenter = () => import(/* webpackChunkName: 'message-center' */ '@/views/message-center/index.vue')

// 权限路由
export const asyncRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: shallowRef(BasicLayout),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomeComponent,
        meta: { title: '主页', icon: 'icon-list', hidden: false, keepAlive: false, isAuth: true, permission: 'home' }
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
        meta: { title: '系统设置', icon: '', hidden: true, keepAlive: false, isAuth: false, permission: 'system_setting' }
      }
    ]
  },
  {
    path: '/mine',
    name: 'Mine',
    component: MineComponent,
    meta: { title: '我的', icon: 'icon-heart-fill', hidden: true, keepAlive: false, isAuth: false, permission: '' }
  }
]

// 基础路由
export const constantRouterMap = [
  {
    path: '/promotion',
    name: 'Promotion',
    component: Promotion,
    meta: { title: '推广页', isWhite: true }
  },
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