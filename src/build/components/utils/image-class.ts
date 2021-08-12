export class SVGImage {
  svgElement: HTMLElement
  width: number
  height: number
  base64: string
  svgString: string

  constructor(svgString: string, height: number, width: number) {
    this.svgString = svgString
    this.svgElement = document.createElement('svg')
    this.base64 = ''
    this.width = width
    this.height = height

    this.createSvgElementFromString()
    this.setViewBox()
    this.setSvgElementWidthHeight()
    this.createImgSrc()
  }

  setClassWidthHeight(height: number, width: number) {
    this.width = width
    this.height = height
  }

  setSvgElementWidthHeight() {
    const width = this.width
    const height = this.height

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

    this.base64 = imgSource
  }

  private createSvgElementFromString() {
    const { documentElement } = new DOMParser().parseFromString(
      this.svgString,
      'image/svg+xml'
    )
    this.svgElement = documentElement
  }

  private setViewBox() {
    const manualViewbox = `0 0 ${this.width} ${this.height}`
    const viewBox = this.svgElement.getAttribute('viewBox')
    if (!viewBox) this.svgElement.setAttribute('viewBox', manualViewbox)
  }
}
