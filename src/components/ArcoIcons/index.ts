import { h, resolveDynamicComponent, type DefineComponent } from 'vue'

// 动态渲染arco图标
export const arcoIcon = {
  render() {
    // render函数的返回值需要是“Vnode”(虚拟节点)格式，“h”函数可以构造“Vnode”格式数据
    const Component = resolveDynamicComponent(this.props.icon)
    return h(<DefineComponent>Component)
  },
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}