import { findSVGs } from './find-svgs'

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
}

export async function organizeSVGs() {
  let allSVGs = findSVGs()
  // Create SVG classes
  allSVGs = allSVGs.map(async i => {
    const newEl = new SVG(i, i.url, i.type)
    await newEl.getXML()
    await newEl.cleanupXML()
    return newEl
  })
  allSVGs = await Promise.all(allSVGs)
  return allSVGs
}
