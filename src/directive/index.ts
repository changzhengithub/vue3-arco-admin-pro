/**
 * @description 定义多个全局自定义指令
 * @author changz
 * @example 在main.js引入之后use挂载
 * */

import type { App, Directive } from 'vue'
// 导入自定义指令
import focus from './modules/focus'
import clickout from './modules/click-out'
import watermark from './modules/watermark'
import permission from './modules/permission'


export default {
  install(Vue: App) {
    Vue.directive('focus', focus as Directive)
    Vue.directive('clickout', clickout as Directive)
    Vue.directive('watermark', watermark as Directive)
    Vue.directive('permission', permission as Directive)
  }
}