/**
 * 点击元素外触事件发指令
 * @description 如点击空白处关闭当前元素
 * @author changz
 * @example
 * <a-button v-click-out="triggerEvent">添加</a-button>
 * <a-button v-click-out="() => triggerEvent(index)">传参</a-button>
 * */

// 手动声明一个
// declare interface Window {
//   clickOutHide: Function
// }
export default {
  // 初始化指令
  bind(el: any, binding: any) {
    function documentHandler(e: Event) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target as Node)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 声明文件，定义全局变量
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.clickOutHide = documentHandler as any
    document.addEventListener('click', documentHandler)
  },
  unbind(el: any) {
    // 解除事件监听
    document.removeEventListener('click', el.clickOutHide)
    delete el.clickOutHide
  }
}