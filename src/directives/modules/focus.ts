export default {
  inserted: function (el: HTMLInputElement, binding: any, vnode: any) {
    el.focus() as unknown as HTMLInputElement
  }
}