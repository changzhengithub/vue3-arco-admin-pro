/**
 * 自动获取焦点指令
 * @description 打开页面时输入表单自动获取焦点
 * @author changz
 * @param {xxx} - xxx
 * @example
 * <a-input v-focus></a-input>
 * */

import type { DirectiveBinding, VNode } from 'vue'

export default {
  mounted(el: HTMLInputElement, binding: DirectiveBinding, vnode: VNode) {
    if (el.tagName === 'input' || el.tagName === 'textarea') {
      el.focus()
    } else {
      const inputDom = el.querySelector('input') ?? el.querySelector('textarea')
      inputDom?.focus()
    }
  }
}