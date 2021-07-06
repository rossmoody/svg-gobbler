export class SVGImage {
  svgElement: HTMLElement
  viewBox: string
  width: string
  height: string
  htmlImageElementSrc: string
  svgString: string

  constructor(presentationSvg: string) {
    this.svgString = presentationSvg
    this.svgElement = document.createElement('svg')
    this.htmlImageElementSrc = ''
    this.viewBox = '0 0 24 24'
    this.width = '24'
    this.height = '24'

    this.createSvgElementFromString()
    this.setViewBox()
    this.removeHeightWidth()
    this.createImgSrc()
  }

  setSvgElementWidthHeight(value: number) {
    const width = String(parseInt(this.width, 10) * value)
    const height = String(parseInt(this.height, 10) * value)

    this.svgElement.setAttribute('width', width)
    this.svgElement.setAttribute('height', height)
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

    if (attributeNames.includes('height'))
      this.height = this.svgElement.getAttribute('height')!

    if (attributeNames.includes('width'))
      this.width = this.svgElement.getAttribute('width')!

    this.viewBox = `0 0 ${this.width} ${this.height}`

    if (attributeNames.includes('viewBox'))
      this.viewBox = this.svgElement.getAttribute('viewBox')!

    this.svgElement.setAttribute('viewBox', this.viewBox)
  }

  private removeHeightWidth() {
    this.svgElement.removeAttribute('height')
    this.svgElement.removeAttribute('width')
  }

  private createImgSrc() {
    const svgCanvasString = new XMLSerializer().serializeToString(
      this.svgElement
    )

    const decoded = unescape(encodeURIComponent(svgCanvasString))
    const base64 = btoa(decoded)
    const imgSource = `data:image/svg+xml;base64,${base64}`

    this.htmlImageElementSrc = imgSource
  }
}
