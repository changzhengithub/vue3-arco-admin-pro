/**
 * 权限配置JSON表
 * @description 用来给每个用户分配权限，对应页面路由权限和操作权限
 * permList 路由权限。
 * operateList 为页面中的操作权限，通过判断让元素是否显示
 * 可以通过 v-page/v-permission指令或者$pagePer/$operatePer在js中判断
 * */

import { ref } from 'vue'

export interface OperateList {
  title: string
  perm: string
  isCheck: boolean
  isShow: boolean
}

export interface PermList {
  title: string
  perm: string
}

export interface PermissionList {
  title: string
  permList: PermList[]
  isCheck: boolean
  indeterminate: boolean
  isDisable: boolean
  operateList: OperateList[]
}

export const permissionList = ref<PermissionList[]>([
  {
    title: '主页',
    permList: [
      { title: '主页', perm: 'home' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '工作台',
    permList: [
      { title: '工作台', perm: 'workbench' },
      { title: '仪表盘', perm: 'dashboard' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '实时监控',
    permList: [
      { title: '实时监控', perm: 'map_charts' },
      { title: '仪表盘', perm: 'dashboard' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '表单验证',
    permList: [
      { title: '表单验证', perm: 'form_model' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '列表页',
    permList: [
      { title: '列表页', perm: 'table_list' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '用户组织',
    permList: [
      { title: '用户组织', perm: 'org_manage' },
      { title: '角色组织', perm: 'role_org' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '角色权限',
    permList: [
      { title: '角色权限', perm: 'role_manage' },
      { title: '角色组织', perm: 'role_org' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: [
      {
        title: '角色管理',
        perm: 'role_per',
        isCheck: false,
        isShow: true
      }
    ]
  },
  {
    title: '系统设置',
    permList: [
      { title: '系统设置', perm: 'system_setting' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '消息中心',
    permList: [
      { title: '消息中心', perm: 'message_center' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: [
      // {
      //   title: '资产管理',
      //   perm: 'asset_jcgl_per',
      //   isCheck: false,
      //   isShow: true
      // }
    ]
  }
])