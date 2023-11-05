import { nanoid } from 'nanoid'
import { Svg } from './svg'

export class GElement extends Svg {
  constructor(originalString: string, origin: string) {
    super(originalString, origin)
    this.asElement = this.processG()
  }

  private processG() {
    const g = this.parseFromString('image/svg+xml')
    if (!g) return

    const id = nanoid()
    const svg = this.createSvgElement()
    const use = this.createUseElement(id)
    const symbol = this.createSymbolElement(id)

    symbol.append(g)
    svg.append(symbol, use)
    return svg
  }
}
