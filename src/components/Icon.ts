import { h, resolveDynamicComponent, type DefineComponent } from 'vue'

export default {
  setup() {
    const Component = resolveDynamicComponent('icon-sun')
    // 返回渲染函数
    return () => h(<DefineComponent>Component)
  }
}