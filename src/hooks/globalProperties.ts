/**
 * 全局hook
 * 获取Vue实例上的全局属性
 * @example 调用示例
 * import useGlobalProperties from '@/hooks/mouse'
 * const { x, y } = useMouse()
 * */

import { getCurrentInstance } from 'vue'

export default function useGlobalProperties() {
  const instance = getCurrentInstance()
  // const globalProperties = instance?.appContext.config.globalProperties
  const global = instance?.proxy
  return { global }
}
