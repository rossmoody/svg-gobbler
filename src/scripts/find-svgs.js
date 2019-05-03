import FileSaver from 'file-saver'
import SVGO from 'svgo'

const svgo = new SVGO({
  multipass: true,
  plugins: [
    {
      cleanupAttrs: true
    },
    {
      removeDoctype: true
    },
    {
      removeXMLProcInst: true
    },
    {
      removeComments: true
    },
    {
      removeMetadata: true
    },
    {
      removeTitle: true
    },
    {
      removeDesc: true
    },
    {
      removeUselessDefs: true
    },
    {
      removeEditorsNSData: true
    },
    {
      removeEmptyAttrs: true
    },
    {
      removeHiddenElems: true
    },
    {
      removeEmptyText: true
    },
    {
      removeEmptyContainers: true
    },
    {
      removeViewBox: false
    },
    {
      cleanUpEnableBackground: true
    },
    {
      convertStyleToAttrs: true
    },
    {
      convertColors: true
    },
    {
      convertPathData: true
    },
    {
      convertTransform: true
    },
    {
      removeUnknownsAndDefaults: true
    },
    {
      removeNonInheritableGroupAttrs: true
    },
    {
      removeUselessStrokeAndFill: true
    },
    {
      removeUnusedNS: true
    },
    {
      cleanupIDs: true
    },
    {
      cleanupNumericValues: true
    },
    {
      moveElemsAttrsToGroup: true
    },
    {
      moveGroupAttrsToElems: true
    },
    {
      collapseGroups: true
    },
    {
      removeRasterImages: false
    },
    {
      mergePaths: true
    },
    {
      convertShapeToPath: false
    },
    {
      sortAttrs: true
    },
    {
      transformsWithOnePath: false
    },
    {
      removeDimensions: false
    },
    {
      removeAttrs: false
    }
  ]
})

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

class SVG {
  constructor(ele, url = null, type) {
    this.ele = ele
    this.url = url
    this.type = type
  }
  // get svg XML info from el with URL
  async getXML() {
    let serializer = new XMLSerializer()
    let parser = new DOMParser()

    if (this.url) {
      return fetch(this.url)
        .then(response => {
          return response.text()
        })
        .then(response => {
          const xml = parser.parseFromString(response, 'image/svg+xml')
            .children[0]
          const string = serializer.serializeToString(xml)
          this.svgString = string
          this.svgXml = xml
        })
    } else {
      return new Promise((resolve, reject) => {
        this.svgString = this.ele.eleString
        this.svgXml = this.ele
        resolve()
      })
    }
  }
  // Set size attributes to svg viewBox attr dynamically for better render in card
  async cleanupXML() {
    let rects = this.ele.getBoundingClientRect()
    let viewBoxHeight = rects.width
    let viewBoxWidth = rects.height

    if (rects.width === 0 && rects.height === 0) {
      this.rects = 'hidden'
    } else if (
      this.svgXml.hasAttribute('width') &&
      this.svgXml.hasAttribute('height')
    ) {
      this.inlineSize = true
      const width = this.svgXml.getAttribute('width')
      const height = this.svgXml.getAttribute('height')
      width.includes('px')
        ? (this.rects = `${width.slice(0, -2)}x${height.slice(0, -2)}`)
        : (this.rects = `${width}x${height}`)
    } else {
      this.rects = `${Math.floor(rects.width)}x${Math.floor(rects.height)}`
    }

    this.cleanXml = this.svgXml.cloneNode(true)
    this.cleanXml.setAttribute('class', 'gob__card__svg__trick')
    this.cleanXml.removeAttribute('height')
    this.cleanXml.removeAttribute('width')
    this.cleanXml.removeAttribute('style')
    this.cleanXml.hasAttribute('viewBox')
      ? ''
      : this.cleanXml.setAttribute(
          'viewBox',
          `0 0 ${viewBoxHeight} ${viewBoxWidth}`
        )
    this.cleanXml.getAttribute('viewBox') === '0 0 0 0'
      ? this.cleanXml.setAttribute('viewBox', `0 0 24 24`)
      : null
    this.cleanXml.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  }

  createOptiDownload() {
    const filename = 'gobble-gobble'
    svgo.optimize(this.svgString).then(function(result) {
      let blob = new Blob([result.data], { type: 'text/xml' })
      FileSaver.saveAs(blob, `${filename}.svg`)
    })
  }

  copyOptiClipboard() {
    svgo.optimize(this.svgString).then(function(result) {
      const el = document.createElement('textarea')
      el.value = result.data
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })
  }
}

export async function findSVGs() {
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
  allSVGs = removeDups(allSVGs, 'eleString')

  // Create SVG classes
  allSVGs = allSVGs.map(async i => {
    const newEl = new SVG(i, i.url, i.type)
    await newEl.getXML()
    await newEl.cleanupXML()
    return newEl
  })
  allSVGs = await Promise.all(allSVGs)
  // console.log(allSVGs)
  return allSVGs
}
