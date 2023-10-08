/**
 * @desc iconfont图标
 * @author changz
 * 通过arco图标提供的addFromIconFontCn方法将生成的在线symbol链接加载到项目图标库中。
 * 然后在main.ts中进行全局注册在组件中直接使用，支持arco图标库部分属性，不支持颜色等其他设置，和svg一样只能在图标库中进行设置。
 * @example 调用示例
 * <icon-font type="icon-add" :size="18" :rotate="45" spin />
 * src为iconfont项目生成的symbol链接，每次图标库更新此链接也要替换。
 * 如果不想这么麻烦可以直接引入iconfot样式进行使用。
 * */

import type { App } from 'vue'
import { Icon } from '@arco-design/web-vue'
const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_4222321_6tg5jydxsia.js' })

// 导出插件
export default {
  install(Vue: App) {
    Vue.component('IconFont', IconFont)
  }
}

// 或者导出全局注册
// export default IconFont
// app.component('IconFont', IconFont)