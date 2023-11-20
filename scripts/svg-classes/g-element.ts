import { Svg } from './svg'

export class GElement extends Svg {
  constructor(originalString: string, id: string) {
    super(originalString, id)
    this.processG()
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
