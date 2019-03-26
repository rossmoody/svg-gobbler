export const getSources = svgInfo => {
  const parsedSvgInfo = svgInfo.map(i => {
    let serializer = new XMLSerializer()
    let parser = new DOMParser()
    let ajax = new XMLHttpRequest()

    if (i.element.hasAttribute('src')) {
      ajax.open('GET', i.element.src, true)
      ajax.send()
      ajax.onload = function(e) {
        let xml = parser.parseFromString(ajax.responseText, 'image/svg+xml')
          .children[0]
        const string = serializer.serializeToString(xml)
        i.source = string
      }
      return i
    } else if (i.element.tagName === 'DIV') {
      let style = window.getComputedStyle(i.element, null)
      style = style.backgroundImage.slice(4, -1).replace(/"/g, '')
      ajax.open('GET', style, true)
      ajax.onload = function() {
        let xml = parser.parseFromString(ajax.responseText, 'image/svg+xml')
          .children[0]
        const string = serializer.serializeToString(xml)
        i.source = string
      }
      return i
    } else if (i.element.hasAttribute('data')) {
      ajax.open('GET', i.element.data, true)
      ajax.send()
      ajax.onload = function() {
        let xml = parser.parseFromString(ajax.responseText, 'image/svg+xml')
          .children[0]
        const string = serializer.serializeToString(xml)
        i.source = string
      }
      return i
    } else {
      const string = serializer.serializeToString(i.element)
      i.source = string
      return i
    }
  })

  return parsedSvgInfo
}
