/**
 * 全局hook
 * 查看当前鼠标位置
 * @example 调用示例
 * import useMouse from '@/hooks/mouse'
 * const { x, y } = useMouse()
 * */

import { ref, onMounted, onUnmounted } from 'vue'

export default function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event: { pageX: number, pageY: number }) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
