/**
 * 全局权限判断方法
 * @description 传入需要判断的权限，判断是否存在改权限
 * @author changz
 * @param {String} [per] - 页面权限
 * @return {boolean} - true/false
 * @example
 * <a-button v-if="hasPer('home')">添加</a-button>
 * */

import { useEmpowerStore } from '@/stores/modules/empower'

export default function hasPer(per: string): boolean {
  // 当前用户拥有的权限列表
  const empowerStore = useEmpowerStore()
  const { menuPermList, operatePermList } = empowerStore
  const permList = menuPermList.concat(operatePermList)
  return permList.includes(per)
}