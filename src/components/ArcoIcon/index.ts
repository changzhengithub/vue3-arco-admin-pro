/**
 * @desc 动态渲染arco图标
 * 通过resolveDynamicComponent动态渲染组件获得arco组件，然后通过h渲染成Vnode返回，
 * 这样就组装成一个arcoIcon组件，和官方使用方法一样
 * @author changz
 * @param {String} [icon] - icon名称
 * @example 调用示例
 * import ArcoIcon from '@/components/ArcoIcon'
 * <ArcoIcon icon="icon-tag" size="30" :style="{color: 'blue'}"></ArcoIcon>
 * */

import { h, defineComponent, resolveDynamicComponent, type DefineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: String
  },
  setup(props: any) {
    const Component = resolveDynamicComponent(props.icon)
    // 返回渲染函数
    return () => h(<DefineComponent>Component)
  }
})