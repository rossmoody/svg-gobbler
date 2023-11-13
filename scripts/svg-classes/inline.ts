import { Svg } from './svg'

/**
 * Inline SVGs are SVGs that are directly in the DOM.
 */
export class Inline extends Svg {
  constructor(originalString: string, origin: string) {
    super(originalString, origin)
    this.asElement = this.parseFromString()
  }
}
