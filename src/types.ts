import { Svg } from 'scripts/svg-classes/svg'

/**
 * The message sent from the Background script to the Content script.
 */
export type BackgroundMessage = {
  /**
   * The data gathered from the active tab
   */
  data: PageData
}

/**
 * The data gathered from the active tab.
 */
export type PageData = {
  /**
   * An array of SVG string elements from the active tab.
   */
  data: string[]
  /**
   * The host URL of the site. This is used to label the tabs and
   * dashboard initially in the sidebar.
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
  }
}
