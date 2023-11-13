/**
 * @desc 文本自动省略号
 * 文本过长自动处理省略号，按照文本长度方式截取。
 * @author changz
 * @param {Boolean} [tooltip] - 是否显示文本气泡
 * @param {Number} [length] - 多少个字符后显示省略号，英文为1汉子为2个字符
 * @example 调用示例
 * import Ellipsis from '@/components/Ellipsis/index'
 * <Ellipsis :length="10" tooltip>中央事件中央事件中央事件中央事件中央事件</Ellipsis>
 * */

import { defineComponent, useSlots, type VNode } from 'vue'
import { cutStrByFullLength, getStrFullLength } from '@/utils/util'

export default defineComponent({
  props: {
    tooltip: {
      type: Boolean
    },
    length: {
      type: Number,
      required: true
    }
  },
  setup(props: any) {
    const slots = useSlots()

    const getStrDom = (str: string, fullLength: number) => {
      return <span>{cutStrByFullLength(str, props.length) + (fullLength > props.length ? '...' : '')}</span>
    }
    const getTooltip = (fullStr: string, fullLength: number) => {
      return (
        <a-tooltip v-slots={{ content: () => fullStr }}>
          {getStrDom(fullStr, fullLength)}
        </a-tooltip>
      )
    }

    return () => {
      const { tooltip, length } = props
      const [defaultSlot] = (slots.default!() as unknown) as VNode[]
      const str = defaultSlot.children as string
      const fullLength = getStrFullLength(str)
      const strDom = tooltip && fullLength > length ? getTooltip(str, fullLength) : getStrDom(str, fullLength)
      return strDom
    }
  }
})