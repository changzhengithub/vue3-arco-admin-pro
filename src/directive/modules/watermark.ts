/**
 * 页面水印指令
 * @description 给页面添加水印
 * @author changz
 * @example
 * <div v-watermark></div>
 * */
import type { DirectiveBinding } from 'vue'

export default {
  // 初始化指令
  bind(el: HTMLElement, binding: DirectiveBinding) {
    // 水印文字，父元素，画布宽度，画布高度，字体，文字颜色
    function addWaterMarker(str: string, parentNode: HTMLElement, width: number, height: number, font: string, textColor: string) {
      // 检查父元素是否包含子元素
      const elementContains = (parent: HTMLElement, child: HTMLCanvasElement | null) => parent !== child && parent.contains(child)
      const flag = elementContains(parentNode, document.querySelector('canvas'))
      // 防止重复创建
      if (!flag) {
        const can = document.createElement('canvas')
        parentNode.appendChild(can)
        can.width = width || 600
        can.height = height || 300
        can.style.display = 'none'
        const cans = can.getContext('2d') as CanvasRenderingContext2D
        cans.rotate(-20 * Math.PI / 180)
        cans.font = font || '13px Microsoft Yahei'
        cans.fillStyle = textColor || 'rgba(255, 255, 255, .2)'
        cans.textAlign = 'left'
        cans.textBaseline = 'middle'
        cans.fillText(str, 10, 100)
        // 设置背景图（整个项目中都添加水印建议使用此方法）
        // parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
        // 创建div 定位覆盖（某个元素，如图片添加水印建议使用此方法）
        const div = document.createElement('div')
        div.id = str
        div.style.pointerEvents = 'none'
        div.style.top = '0'
        div.style.left = '0'
        div.style.position = 'absolute'
        div.style.zIndex = '99'
        div.style.width = '100%'
        div.style.height = '100%'
        div.style.background = 'url(' + can.toDataURL('image/png') + ')'
        parentNode.appendChild(div)
      }
    }
    if (binding.value.text) {
      addWaterMarker(binding.value.text, el, binding.value.width, binding.value.height, binding.value.font, binding.value.textColor)
    }
  }
}