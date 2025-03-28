import { Svg } from './svg'

export class GElement extends Svg {
  constructor(originalString: string, id: string, lastModified: string, name: string) {
    super(originalString, id, lastModified, name)
    this.removeXlinkHref()
    this.processG()
  }

  private processG() {
    const offDomContainer = document.createElement('div')
    offDomContainer.style.visibility = 'hidden'
    document.body.appendChild(offDomContainer)

    const svg = this.createSvgElement()
    offDomContainer.appendChild(svg)
    svg.innerHTML = this.originalString

    const gElement = svg.querySelector('g') as SVGGElement
    const bBox = gElement.getBBox()
    document.body.removeChild(offDomContainer)

    svg.setAttribute('viewBox', `${bBox.x} ${bBox.y} ${bBox.width} ${bBox.height}`)

    this.asElement = svg
    this.originalString = svg.outerHTML
  }

  private removeXlinkHref() {
    // parseFromString fails to parse xlink:href as it is deprecated
    this.originalString = this.originalString.replace(/xlink:href/g, 'href')
  }
}
