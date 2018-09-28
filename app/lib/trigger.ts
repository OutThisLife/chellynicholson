export default (el: HTMLElement, type: string) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, false, true)
  el.dispatchEvent(e)
}
