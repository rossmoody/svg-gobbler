import { StorageSvg } from '../types'
import { Svg } from './svg'

export class GElement extends Svg {
  constructor(storageSvg: StorageSvg) {
    super(storageSvg)
    this.removeXlinkHref()
    this.processG()
  }

  private processG() {
    const offDomContainer = document.createElement('div')
    offDomContainer.style.visibility = 'hidden'
    document.body.append(offDomContainer)

    const svg = this.createSvgElement()
    offDomContainer.append(svg)
    svg.innerHTML = this.svg

    const gElement = svg.querySelector('g') as SVGGElement
    const bBox = gElement.getBBox()
    offDomContainer.remove()

    svg.setAttribute('viewBox', `${bBox.x} ${bBox.y} ${bBox.width} ${bBox.height}`)

    this.asElement = svg
    this.svg = svg.outerHTML
  }

  private removeXlinkHref() {
    // parseFromString fails to parse xlink:href as it is deprecated
    this.svg = this.svg.replaceAll('xlink:href', 'href')
  }
}
