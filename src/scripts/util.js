export function prettyName(uglyName) {
  return uglyName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
}

export function addSrcType(i, srcType) {
  i.srctype = srcType
  return i
}

export function isRegSVG(el) {
  const inner = el.innerHTML
  if (!inner.includes('<use')) {
    addSrcType(el, 'svgTag')
    return el
  }
}

export function hasBgImg(el) {
  const style = window.getComputedStyle(el, null)
  if (style.backgroundImage !== 'none') {
    addSrcType(el, 'bgImg')
    return el
  }
}

export function ajaxCall(el, elSvg) {
  let ajax = new XMLHttpRequest()
  let serializer = new XMLSerializer()
  let parser = new DOMParser()

  ajax.open('GET', elSvg, true)
  ajax.send()
  ajax.onload = function() {
    let xml = parser.parseFromString(ajax.responseText, 'image/svg+xml')
      .children[0]
    const string = serializer.serializeToString(xml)
    el.source = string
  }
}
