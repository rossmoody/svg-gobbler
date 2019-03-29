export function ajaxCall (el, elSvg) {
  let ajax = new XMLHttpRequest()
  let serializer = new XMLSerializer()
  let parser = new DOMParser()

  ajax.open('GET', elSvg, true)
  ajax.send()
  ajax.onload = function () {
    let xml = parser.parseFromString(ajax.responseText, 'image/svg+xml')
      .children[0]
    const string = serializer.serializeToString(xml)
    el.source = string
  }
}

///////////////////////
// Requests, parses and serializes SVG information
// using different methods based on how it's positioned
// in the DOM (bgImg, imgSrc, inline SVG, sprite, object)
export const getSources = svgInfo => {
  const parsedSvgInfo = svgInfo.map(i => {
    let serializer = new XMLSerializer()
    if (i.srctype === 'imgTag') {
      ajaxCall(i, i.element.src)
      return i
    } else if (i.srctype === 'bgImg') {
      ajaxCall(i, i.bgImgUrl)
      return i
    } else if (i.srctype === 'useTag') {
      let href = i.element.href.baseVal
      ajaxCall(i, href)
      return i
    } else if (i.srctype === 'objTag') {
      ajaxCall(i, i.element.data)
      return i
    } else if (i.srctype === 'svgTag') {
      const string = serializer.serializeToString(i.element)
      i.source = string
      return i
    }
  })

  return parsedSvgInfo
}
