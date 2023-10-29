/**
 * 全局权限指令
 * @description 传入当前操作需要的权限，进行判断是否显示
 * @author changz
 * @param {String} - 权限
 * @example
 * <a-button v-permission="'role_auth_per'">添加</a-button>
 * */

// 或者在util中定义一个公共函数，传入权限通过v-if判断是否显示当前操作

import type { DirectiveBinding, VNode } from 'vue'

import { useEmpowerStore } from '@/stores/modules/empower'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    // 当前用户拥有的权限列表
    const empowerStore = useEmpowerStore()
    const { menuPermList, operatePermList } = empowerStore
    const permList = menuPermList.concat(operatePermList)
    const permission = binding.value // 获取权限值
    if (!permList.includes(permission)) {
      el.parentElement?.removeChild(el) // 不拥有该权限移除dom元素
    }
  }
}