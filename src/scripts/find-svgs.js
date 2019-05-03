function hasSvgBgImg(el) {
  let style = window.getComputedStyle(el, null)
  let url = style.backgroundImage.slice(4, -1).replace(/"/g, '')
  let fileType = url.substr(url.lastIndexOf('.') + 1)
  if (style.backgroundImage !== 'none' && /(svg)$/gi.test(fileType)) {
    el.url = url
    el.type = 'bg img'
    return el
  }
}

function isXlink(el) {
  const firstChild = el.firstElementChild

  if (firstChild.tagName === 'symbol') {
    el.type = 'symbol'
    el.spriteId = el.getAttribute('id')
  } else if (firstChild.tagName === 'use') {
    el.spriteId = firstChild.getAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href'
    )
    el.type = 'sprite'
  } else {
    el.type = 'inline svg'
  }
  return el
}

function addSrcType(el) {
  if (el.tagName === 'IMG') {
    el.url = el.src
    el.type = 'img src'
  } else if (el.tagName === 'OBJECT') {
    el.url = el.data
    el.type = 'object'
  }
  return el
}

function removeDups(arr, comp) {
  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e])

  return unique
}

export function findSVGs() {
  let svgTags = Array.from(document.querySelectorAll('svg'))
  let objDatas = Array.from(document.querySelectorAll('object[data*=".svg"]'))
  let imgSrcs = Array.from(document.querySelectorAll('img[src*=".svg"]'))
  let pageDivs = Array.from(document.querySelectorAll('div'))

  pageDivs = pageDivs.filter(i => hasSvgBgImg(i))
  objDatas = objDatas.map(i => addSrcType(i))
  imgSrcs = imgSrcs.map(i => addSrcType(i))
  svgTags = svgTags.map(i => isXlink(i))

  let allSVGs = [...svgTags, ...imgSrcs, ...objDatas, ...pageDivs]

  // Remove dups
  allSVGs = allSVGs.map(i => {
    const serializer = new XMLSerializer()
    const string = serializer.serializeToString(i)
    i.eleString = string
    return i
  })

  // Returns unique svg elements with
  // property eleString
  return (allSVGs = removeDups(allSVGs, 'eleString'))
}
