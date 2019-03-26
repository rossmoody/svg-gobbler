import { ajaxCall } from './util'

export const getSources = svgInfo => {
  const parsedSvgInfo = svgInfo.map(i => {
    let serializer = new XMLSerializer()
    if (i.srctype === 'imgTag') {
      ajaxCall(i, i.element.src)
      return i
    } else if (i.element.tagName === 'DIV') {
      let style = window.getComputedStyle(i.element, null)
      style = style.backgroundImage.slice(4, -1).replace(/"/g, '')
      ajaxCall(i, style)
      return i
    } else if (i.element.tagName === 'use') {
      let href = i.element.href.baseVal
      ajaxCall(i, href)
      return i
    } else if (i.element.hasAttribute('data')) {
      ajaxCall(i, i.element.data)
      return i
    } else {
      const inner = i.element.innerHTML
      if (!inner.includes('xlink')) {
        const string = serializer.serializeToString(i.element)
        i.source = string
      }
      return i
    }
  })

  return parsedSvgInfo
}
