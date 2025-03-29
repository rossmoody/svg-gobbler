import { StorageSvg } from '../types'
import { Svg } from './svg'

/**
 * Inline SVGs are SVGs that are directly in the DOM.
 */
export class Inline extends Svg {
  constructor(storageSvg: StorageSvg) {
    super(storageSvg)
    this.asElement = this.parseFromString()
    this.setViewBox()
  }

  /**
   * An earnest effort to set a viewBox so we can handle resizing and displaying the SVGs.
   * Returns a clone of the SVG.
   */
  setViewBox() {
    if (!this.asElement) return
    const svg = this.asElement as SVGSVGElement

    const viewBox = svg.getAttribute('viewBox')
    if (viewBox) return

    const height = svg.getAttribute('height')?.replace('px', '')
    const width = svg.getAttribute('width')?.replace('px', '')
    if (height && width) {
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      return
    }
  }
}
