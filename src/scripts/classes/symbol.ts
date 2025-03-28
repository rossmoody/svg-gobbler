import { Svg } from './svg'

export class SvgSymbol extends Svg {
  constructor(originalString: string, id: string, lastModified: string, name: string) {
    super(originalString, id, lastModified, name)
    this.processSymbol()
  }

  /**
   * Processes the given symbol string into a sprite element.
   * If the symbol string is invalid, the element will be undefined.
   */
  private processSymbol() {
    const symbol = this.parseFromString()
    if (!symbol) return

    const id = crypto.randomUUID()
    const svg = this.createSvgElement()
    const useElement = this.createUseElement(id)
    symbol.setAttribute('id', id)

    const viewBox = symbol.getAttribute('viewBox')
    viewBox && svg.setAttribute('viewBox', viewBox)

    svg.append(symbol, useElement)

    this.asElement = svg
    this.originalString = svg.outerHTML
  }
}
