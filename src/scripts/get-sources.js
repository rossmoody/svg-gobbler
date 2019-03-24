export const getSources = svgInfo => {
  svgInfo = svgInfo.map(i => {
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
    } else if (i.element.hasAttribute('data')) {
      ajax.open('GET', i.element.data, true)
      ajax.send()
      ajax.onload = function(e) {
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

  return svgInfo
}
