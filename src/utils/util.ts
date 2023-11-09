/**
 * @description 公共函数
 * @author changz
 * @import import { deepClone } from '@/utils/util'
 * */

/**
 * @description 深拷贝
 * @param {Any} [target] - 拷贝数据
 * @author changz
 * */
interface Obj {
  [key: string]: any
}
export function deepClone(target: Obj) {
  // 引用类型
  if (typeof target === 'object' && target !== null) {
    const targeClone: Obj = Array.isArray(target) ? [] : {}
    for (const key in target) {
      targeClone[key] = deepClone(target[key])
    }
    return targeClone
  } else {
    return target
  }
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export function getStrFullLength(str = '') {
  const strLength = str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)
  return strLength
}

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export function cutStrByFullLength(str: string, maxLength: number) {
  let showLength = 0
  const strLength = str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
  return strLength
}

/**
 * @description 数组根据某个字段进行排序
 * @param {Array} [list] - 排序数组
 * @param {String} [field] - 排序字段
 * @param {String} [order] - asc 升序 desc 降序
 * @example sortArray(arr, 'age')
 * @author changz
 * */
export function sortArray(list: any[], field: string, order: string = 'desc') {
  // 比较函数
  function compare(p: string) {
    return function (item1: { [x: string]: any }, item2: { [x: string]: any }) {
      const a = item1[p]
      const b = item2[p]
      if (order === 'desc') {
        return b - a // 降序
      } else {
        return a - b // 升序
      }
    }
  }
  const sortArr = list.sort(compare(field))
  return sortArr
}

/**
 * @description 获取某个元素到页面顶部和左边的距离
 * @param {HTML} [ele] - DOM元素
 * @example getOffsetPosition(dom)
 * @author changz
 * */
export function getOffsetPosition(ele: HTMLElement, x = 0, y = 0) {
  if (ele.offsetParent != null) {
    return getOffsetPosition(ele.offsetParent as HTMLElement, ele.offsetLeft + x, ele.offsetTop + y)
  } else {
    return {
      x,
      y
    }
  }
}


// 补零
export function fillZero(num: number) {
  return num < 10 ? '0' + num : num
}