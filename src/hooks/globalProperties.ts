/**
 * 全局hook
 * 获取Vue实例上的全局属性
 * @example 调用示例
 * import useGlobalProperties from '@/hooks/globalProperties'
 * const { global } = useGlobalProperties()
 * global?.$message.success('操作成功')
 * */

import { getCurrentInstance } from 'vue'

export default function useGlobalProperties() {
  const instance = getCurrentInstance()
  // const global = instance?.proxy
  const global = instance?.appContext.config.globalProperties
  return { global }
}
