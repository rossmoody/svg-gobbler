import type { DocumentData, GElement, Image, Inline, Svg, SvgSymbol } from 'svg-gobbler-scripts'

/**
 * The message sent from the Background script to the Content script.
 */
export type BackgroundMessage = {
  /**
   * The data gathered from the active tab
   */
  data: DocumentData
}

/**
 * The shape of the svg data stored in chrome storage as part of page data.
 */
export type StorageSvg = {
  /**
   * A unique id for the svg. Used to identify the svg in storage and also as
   * the id for routing to a given svg.
   */
  id: string
  /**
   * The svg string of the item.
   */
  svg: string
}

/**
 * The model for data stored and gathered from the document
 */
export type PageData = {
  /**
   * An array of SVG string elements from the active tab.
   */
  data: StorageSvg[]
  /**
   * The host URL of the site. This is used as a name for collection and
   * dashboard title initially in the sidebar.
   */
  host: string
  /**
   * The origin of the active tab. This is used to rebuild the SVGs in the
   * content script. Especially related to image sources and cors restrictions.
   */
  origin: string
}

/**
 * The model of a collection that is stored in local storage.
 */
export type Collection = {
  /**
   * The id of the collection. Used to identify the collection in local storage
   * and also as the id for routing to a given collection.
   */
  id: string
  /**
   * The name of the collection. Displayed in the sidebar and in the top bar when active.
   */
  name: string
  /**
   * The origin URL of the original source. This is used to create favicon links
   */
  origin: string
}

/**
 * The collection data gathered from storage and forwarded to client context.
 * This is shared with client contex types for parity.
 */
export type CollectionData = {
  /**
   * The id of the collection.
   */
  collectionId: Collection['id']
  /**
   * The data gathered from the active tab.
   */
  data: Svg[]
  /**
   * The settings for how the collection is view. Primarily the state of the
   * top bar in the collection view.
   */
  view: {
    /**
     * The size of the icons in the collection
     */
    size: number
    /**
     * The sort order of the collection
     */
    sort: 'none' | 'file-asc' | 'file-desc'
    /**
     * The filters applied to the collection
     */
    filters: {
      /**
       * Whether to hide icons that restrict via cors
       */
      'hide-cors': boolean
    }
  }
}

/**
 * The params passed to a standard details route.
 */
export type DetailsParams = {
  /**
   * The id of the collection.
   */
  collectionId: string
  /**
   * The original svg string upon load.
   */
  originalString: string
  /**
   * The id of the svg in storage
   */
  id: string
}

/**
 * A union of all the svg types that are returned from the svgFactory
 */
export type SvgType = Inline | Image | SvgSymbol | GElement
