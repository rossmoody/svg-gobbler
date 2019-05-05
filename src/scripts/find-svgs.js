class ManageSVGs {
  filterSVGs(el) {
    if (el.tagName === 'svg') {
      const firstChild = el.firstElementChild
      if (firstChild.tagName === 'symbol') {
        el.type = 'symbol'
        el.spriteId = el.getAttribute('id')
      } else if (firstChild.tagName === 'use') {
        el.type = 'sprite'
        el.spriteId = firstChild.getAttributeNS(
          'http://www.w3.org/1999/xlink',
          'href'
        )
      } else {
        el.type = 'inline'
      }
    } else if (el.tagName === 'IMG') {
      el.url = el.src
      el.type = 'img src'
    } else if (el.tagName === 'OBJECT') {
      el.url = el.data
      el.type = 'object'
    } else if (el.tagName === 'DIV') {
      let style = window.getComputedStyle(el, null)
      let url = style.backgroundImage.slice(4, -1).replace(/"/g, '')
      let fileType = url.substr(url.lastIndexOf('.') + 1)

      if (style.backgroundImage !== 'none' && /(svg)$/gi.test(fileType)) {
        el.url = url
        el.type = 'bg img'
      }
    }
    return el
  }

  serializeSVG(el) {
    const serializer = new XMLSerializer()
    const string = serializer.serializeToString(el)
    el.eleString = string
  }

  removeDups(arr, comp) {
    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e])

    return unique
  }
}

const svgCtrl = new ManageSVGs()

// Gather all the possible SVG elements on a page
export function findSVGs() {
  let svgTags = Array.from(document.querySelectorAll('svg'))
  let objDatas = Array.from(document.querySelectorAll('object[data*=".svg"]'))
  let imgSrcs = Array.from(document.querySelectorAll('img[src*=".svg"]'))
  let pageDivs = Array.from(document.querySelectorAll('div'))

  let allSVGs = [...svgTags, ...imgSrcs, ...objDatas, ...pageDivs]

  // Filter the SVG elements down
  allSVGs = allSVGs.filter(i => {
    svgCtrl.filterSVGs(i)
    i.type ? svgCtrl.serializeSVG(i) : null
    return i.type
  })

  // Remove duplicates
  allSVGs = svgCtrl.removeDups(allSVGs, 'eleString')
  return allSVGs
}
