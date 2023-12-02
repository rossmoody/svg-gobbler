import { Svg } from './svg'

export class GElement extends Svg {
  constructor(originalString: string, id: string) {
    super(originalString, id)
    this.removeXlinkHref()
    this.processG()
  }

  private removeXlinkHref() {
    // parseFromString fails to parse xlink:href as it is deprecated
    this.originalString = this.originalString.replace(/xlink:href/g, 'href')
  }

  private processG() {
    const g = this.parseFromString()
    if (!g) return

    const viewBox = g.getAttribute('viewBox')
    g.removeAttribute('viewBox') // Cleanup useless viewBox

    const svg = this.createSvgElement()
    svg.setAttribute('viewBox', viewBox ?? '0 0 24 24')
    svg.appendChild(g)

    this.asElement = svg
    this.originalString = svg.outerHTML
  }
}
