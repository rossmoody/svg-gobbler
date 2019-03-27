// Used to make the filename pretty
export function prettyName(uglyName) {
  return uglyName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
}

// Sets the srctype property when mapping the global array
export function addSrcType(i, srcType) {
  i.srctype = srcType
  return i
}

// Checks if SVG is inline or a sprite that xlinks via 'use' tag
export function isRegSVG(el) {
  const inner = el.innerHTML
  if (!inner.includes('<use')) {
    addSrcType(el, 'svgTag')
    return el
  }
}

// checks if the element bas a backgroung image that
// is of type 'svg'. This currently checks all divs on the page
// This seems like it could be optimized
export function hasSvgBgImg(el) {
  let style = window.getComputedStyle(el, null)
  let url = style.backgroundImage.slice(4, -1).replace(/"/g, '')
  let fileType = url.substr(url.lastIndexOf('.') + 1)
  if (style.backgroundImage !== 'none' && /(svg)$/gi.test(fileType)) {
    el.bgImgUrl = url
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
