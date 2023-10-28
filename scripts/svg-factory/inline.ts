import { Svg } from './svg'

/**
 * Inline SVGs are SVGs that are directly in the DOM.
 */
export class Inline extends Svg {
  constructor(originalString: string, origin: string) {
    super(originalString, origin)
    this.asElement = this.parseFromStringXmlMime()
  }

  /**
   * Rebuild the SVG element from the original string
   */
  private parseFromStringXmlMime() {
    const parser = new DOMParser()
    const { documentElement } = parser.parseFromString(this.originalString, 'image/svg+xml')

    if (!documentElement.querySelector('parsererror')) {
      return documentElement
    }
  }
}
