import type { GElement } from './classes/g-element'
import type { Image } from './classes/image'
import type { Inline } from './classes/inline'
import type { Svg } from './classes/svg'
import type { SvgSymbol } from './classes/symbol'

/**
 * The shape of the svg data stored in chrome storage as part of page data. This data
 * gets processed in and out of SVGType. We do this to save space in storage and
 * to make it easier to work with the data in the content script. This is the only information
 * we keep track of persistently for the SVGs.
 */
export type StorageSvg = Pick<Svg, 'id' | 'lastEdited' | 'name' | 'svg'>

/**
 * The shape of the data that is gathered from the document.
 */
export type DocumentData = {
  /**
   * An array of SVG string elements from the active tab.
   */
  data: StorageSvg[]
  /**
   * The host URL of the document.
   */
  host: string
  /**
   * The specific URL of the document. Used in merging collections based on the URL.
   */
  href: string
  /**
   * A string containing the canonical form of the origin of the specific location.
   * This is used to rebuild the SVGs in the content script. Especially related to
   * image sources and cors restrictions.
   */
  origin: string
}

/**
 * A union of all the svg types that are returned from the svgFactory
 */
export type SvgType = GElement | Image | Inline | SvgSymbol
