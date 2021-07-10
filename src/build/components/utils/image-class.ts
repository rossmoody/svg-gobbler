export class SVGImage {
  svgElement: HTMLElement
  viewBox: string
  width: number
  height: number
  htmlImageElementSrc: string
  svgString: string

  constructor(svgString: string, height: number, width: number) {
    this.svgString = svgString
    this.svgElement = document.createElement('svg')
    this.htmlImageElementSrc = ''
    this.viewBox = '0 0 24 24'
    this.width = width
    this.height = height

    this.createSvgElementFromString()
    this.setViewBox()
    this.setSvgElementWidthHeight(1)
    this.createImgSrc()
  }

  setSvgElementWidthHeight(value: number) {
    const width = this.width * value
    const height = this.height * value

    this.svgElement.setAttribute('width', String(width))
    this.svgElement.setAttribute('height', String(height))

    this.width = width
    this.height = height
  }

  createImgSrc() {
    const svgCanvasString = new XMLSerializer().serializeToString(
      this.svgElement
    )

    const decoded = unescape(encodeURIComponent(svgCanvasString))
    const base64 = btoa(decoded)
    const imgSource = `data:image/svg+xml;base64,${base64}`

    this.htmlImageElementSrc = imgSource
  }

  private createSvgElementFromString() {
    const iDoc = new DOMParser().parseFromString(
      this.svgString,
      'image/svg+xml'
    )

    this.svgElement = iDoc.documentElement
  }

  private setViewBox() {
    const attributeNames = this.svgElement.getAttributeNames()

    this.viewBox = `0 0 ${this.width} ${this.height}`

    if (attributeNames.includes('viewBox'))
      this.viewBox = this.svgElement.getAttribute('viewBox')!

    this.svgElement.setAttribute('viewBox', this.viewBox)
  }
}
