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
    el.type = 'bgImg'
    return el
  }
}

function addSrcType(el, srcType) {
  el.type = srcType
  if (el.tagName === 'IMG') {
    el.url = el.src
    return el
  } else if (el.tagName === 'OBJECT') {
    el.url = el.data
    return el
  }
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
  constructor(ele, id, url = null, type = 'svg') {
    this.ele = ele
    this.id = id
    this.url = url
    this.type = type
  }
  // get svg XML info from el with URL
  async getXML() {
    let serializer = new XMLSerializer()
    let parser = new DOMParser()

    if (this.url) {
      return fetch(this.url, { mode: 'no-cors' })
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
      const string = serializer.serializeToString(this.ele)
      this.svgString = string
      this.svgXml = this.ele
    }
  }
  // sets size attributes to svg viewBox attr dynamically for better render in card
  cleanupXML() {
    let rects = this.ele.getBoundingClientRect()
    let viewBoxHeight = rects.width
    let viewBoxWidth = rects.height

    this.cleanXml = this.svgXml.cloneNode(true)
    this.cleanXml.setAttribute('class', 'card__clone__svg')
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

  createOrigDownload() {
    const filename = 'svg-gobbler-original'
    let blob = new Blob([this.svgString], { type: 'text/xml' })
    FileSaver.saveAs(blob, `${filename}.svg`)
  }

  createOptiDownload() {
    const filename = 'svg-gobbler-optimized'
    svgo.optimize(this.svgString).then(function(result) {
      let blob = new Blob([result.data], { type: 'text/xml' })
      FileSaver.saveAs(blob, `${filename}.svg`)
    })
  }

  copyOrigClipboard() {
    const el = document.createElement('textarea')
    el.value = this.svgString
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
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
  objDatas = objDatas.map(i => addSrcType(i, 'obj'))
  imgSrcs = imgSrcs.map(i => addSrcType(i, 'img'))

  let allSVGs = [...svgTags, ...imgSrcs, ...objDatas, ...pageDivs]

  allSVGs = allSVGs.map(async (i, index) => {
    const newEl = new SVG(i, index, i.url, i.type)
    await newEl.getXML()
    newEl.cleanupXML()
    return newEl
  })
  allSVGs = await Promise.all(allSVGs)
  allSVGs = removeDups(allSVGs, 'svgString')
  return allSVGs
}
