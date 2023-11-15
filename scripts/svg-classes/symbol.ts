import { nanoid } from 'nanoid'
import { Svg } from './svg'

export class Symbol extends Svg {
  constructor(originalString: string, origin: string) {
    super(originalString, origin)
    this.processSymbol()
  }

  /**
   * Processes the given symbol string into a sprite element.
   * If the symbol string is invalid, the element will be undefined.
   */
  private processSymbol() {
    const symbol = this.parseFromString()
    if (!symbol) return

    const id = nanoid()
    const svg = this.createSvgElement()
    const useElement = this.createUseElement(id)
    symbol.id = id

    const viewBox = symbol.getAttribute('viewBox')
    const height = symbol.getAttribute('height')
    const width = symbol.getAttribute('width')

    viewBox && svg.setAttribute('viewBox', viewBox)
    height && svg.setAttribute('height', height)
    width && svg.setAttribute('width', width)

    svg.append(symbol, useElement)

    this.asElement = svg
    this.originalString = svg.outerHTML
  }
}
