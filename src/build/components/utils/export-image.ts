import { handle } from './actions'

// function buildModal(i) {
//   // Download function
//   function exportImg() {
//     const select = document.getElementById('canvas-select')
//     const { value } = select

//     const width = specs.width * value
//     const height = specs.height * value

//     // Need to set explicit width and height or Firefox exports empty PNG
//     svgElement.setAttribute('width', width)
//     svgElement.setAttribute('height', height)

//     const img = buildImg(svgElement)

//     img.addEventListener('load', () => download.img(img, width, height))
//   }
// }

export class SVGImage {
  svgString: string
  svgElement: HTMLElement
  viewBox: string
  htmlImageElementSrc: string
  width: string
  height: string

  constructor(presentationSvg: string) {
    this.svgString = presentationSvg
    this.svgElement = document.createElement('svg')
    this.viewBox = '0 0 24 24'
    this.htmlImageElementSrc = ''
    this.width = '24'
    this.height = '24'

    this.createSvgElementFromString()
    this.getViewBox()
    this.setClassHeightWidth()
    this.removeHeightWidth()
    this.createImgSrc()
  }

  setSvgElementWidthHeight(value: number) {
    const width = parseInt(this.width, 10) * value
    const height = parseInt(this.height, 10) * value

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

  private getViewBox() {
    const attributeNames = this.svgElement.getAttributeNames()

    if (attributeNames.includes('viewBox'))
      this.viewBox = this.svgElement.getAttribute('viewBox')!
  }

  private setClassHeightWidth() {
    const sizeArr: string[] = this.viewBox.split(' ')

    const [, , width, height] = sizeArr

    this.width = width
    this.height = height
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
