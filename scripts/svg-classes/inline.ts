import { Svg } from './svg'

/**
 * Inline SVGs are SVGs that are directly in the DOM.
 */
export class Inline extends Svg {
  constructor(originalString: string, id: string) {
    super(originalString, id)
    this.asElement = this.parseFromString()
  }
}
