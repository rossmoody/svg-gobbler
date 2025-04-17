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
   */
  setViewBox() {
    if (!this.asElement) return
    const svg = this.asElement as SVGSVGElement

    const viewBox = svg.getAttribute('viewBox')
    if (viewBox) return

    const width = svg.getAttribute('width')
    const height = svg.getAttribute('height')

    if (width && height) {
      const cleanWidth = width.replaceAll(/[^0-9.]/g, '')
      const cleanHeight = height.replaceAll(/[^0-9.]/g, '')

      if (cleanWidth && cleanHeight) {
        svg.setAttribute('viewBox', `0 0 ${cleanWidth} ${cleanHeight}`)
        return
      }
    }

    try {
      const bBox = svg.getBBox()
      if (bBox.width > 0 && bBox.height > 0) {
        svg.setAttribute('viewBox', `${bBox.x} ${bBox.y} ${bBox.width} ${bBox.height}`)
        return
      }
    } catch {
      console.warn('Failed to get SVG dimensions using getBBox():', this.name)
    }
  }
}
