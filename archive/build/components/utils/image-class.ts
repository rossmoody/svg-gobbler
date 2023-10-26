export class SVGImage {
  svgElement!: HTMLElement

  constructor(
    public svgString: string,
    public height: number,
    public width: number,
  ) {
    this.setSvgElement()
    this.setViewBox()
    this.setSvgElementWidthHeight()
  }

  setSvgElement() {
    const parser = new DOMParser()
    const { documentElement } = parser.parseFromString(
      this.svgString,
      'image/svg+xml',
    )
    documentElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this.svgElement = documentElement
  }

  setSvgElementWidthHeight() {
    this.svgElement.setAttribute('width', String(this.width))
    this.svgElement.setAttribute('height', String(this.height))
  }

  private setViewBox() {
    const manualViewbox = `0 0 ${this.width} ${this.height}`
    const viewBox = this.svgElement.getAttribute('viewBox')
    if (viewBox === null) this.svgElement.setAttribute('viewBox', manualViewbox)
  }
}
