import { shallowRef } from 'vue'
import BasicLayout from '@/layouts/BasicLayout.vue'
import RouteView from '@/layouts/RouteView.vue'
import { type RouteRecordRaw } from 'vue-router'

/**
 * @desc 权限路由表
 * 路由分为需要登录的不需要登录的
 * 不需要登录的放在基础路由里，如登录、注册、活动页，需要登录的放在权限路由里，
 * 白名单页面放在基础路由里，如活动页，通过meta字段isWhite区分登录注册页
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
const Workbench = () => import(/* webpackChunkName: 'workbench' */ '@/views/workbench/index.vue')
const MapCharts = () => import(/* webpackChunkName: 'map-charts' */ '@/views/map-charts/index.vue')
const RoleManage = () => import(/* webpackChunkName: 'role-manage' */ '@/views/role-manage/index.vue')
const OrgManage = () => import(/* webpackChunkName: 'org-manage' */ '@/views/org-manage/index.vue')
const TableList = () => import(/* webpackChunkName: 'table-list' */ '@/views/table-list/index.vue')
const FormModel = () => import(/* webpackChunkName: 'from-model' */ '@/views/form-model/index.vue')
const Example = () => import(/* webpackChunkName: 'example' */ '@/views/example/index.vue')

const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/views/user-center/index.vue')
const SystemSetting = () => import(/* webpackChunkName: 'system-setting' */ '@/views/system-setting/index.vue')
const MessageCenter = () => import(/* webpackChunkName: 'message-center' */ '@/views/message-center/index.vue')

// 权限路由
export const asyncRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: shallowRef(BasicLayout),
    meta: { hidden: false, keepAlive: false, isAuth: false },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomeComponent,
        meta: { title: '主页', icon: 'icon-apps', hidden: false, keepAlive: true, isAuth: true, permission: 'home' }
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: shallowRef(RouteView),
        meta: { title: '仪表盘', icon: 'icon-dashboard', hidden: false, keepAlive: true, isAuth: true, permission: 'dashboard' },
        children: [
          {
            path: '/workbench',
            name: 'Workbench',
            component: Workbench,
            meta: { title: '工作台', icon: 'icon-common', hidden: false, keepAlive: false, isAuth: true, permission: 'workbench' }
          },
          {
            path: '/map-charts',
            name: 'MapCharts',
            component: MapCharts,
            meta: { title: '实时监控', icon: 'icon-computer', hidden: false, keepAlive: true, isAuth: true, permission: 'map_charts' }
          }
        ]
      },
      {
        path: '/table-list',
        name: 'TableList',
        component: TableList,
        meta: { title: '列表页', icon: 'icon-list', hidden: false, keepAlive: true, isAuth: true, permission: 'table_list' }
      },
      {
        path: '/form-model',
        name: 'FormModel',
        component: FormModel,
        meta: { title: '表单验证', icon: 'icon-subscribed', hidden: false, keepAlive: true, isAuth: true, permission: 'form_model' }
      },
      {
        path: '/example',
        name: 'Example',
        component: Example,
        meta: { title: '示例', icon: 'icon-pen-fill', hidden: false, keepAlive: true, isAuth: true, permission: 'form_model' }
      },
      {
        path: '/role-org',
        name: 'RoleOrg',
        component: shallowRef(RouteView),
        meta: { title: '角色组织', icon: 'icon-branch', hidden: false, keepAlive: true, isAuth: true, permission: 'role_org' },
        children: [
          {
            path: '/role-manage',
            name: 'RoleManage',
            component: RoleManage,
            meta: { title: '角色权限', icon: 'icon-user-add', hidden: false, keepAlive: true, isAuth: true, permission: 'role_manage' }
          },
          {
            path: '/org-manage',
            name: 'OrgManage',
            component: OrgManage,
            meta: { title: '组织部门', icon: 'icon-user-group', hidden: false, keepAlive: false, isAuth: true, permission: 'org_manage' }
          }
        ]
      },
      {
        path: 'https://arco.design/vue/docs/pro/faq',
        name: 'Faq',
        redirect: '',
        meta: { title: '常见问题', icon: 'icon-apps', hidden: false, keepAlive: false, isOpen: true, isAuth: false, permission: '' }
      },
      {
        path: '/user-center',
        name: 'UserCenter',
        component: UserCenter,
        meta: { title: '个人中心', icon: '', hidden: true, keepAlive: true, isAuth: false, permission: 'account' }
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
export const constantRouterMap: RouteRecordRaw[] = [
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