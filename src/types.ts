import type { DocumentData, StorageSvg, Svg } from 'src/scripts'

import { type UserState } from './providers'

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
 * The model for data stored and gathered from the document.
 * This is really collection data.
 */
export type PageData = {
  data: StorageSvg[]
} & DocumentData

/**
 * The model of a collection that is stored in local storage.
 */
export type Collection = {
  /**
   * The emoji used to represent the collection in the sidebar.
   */
  emoji?: string
  /**
   * The original URL of the source. This is used to merge collections based on the URL.
   */
  href: string
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
     * The card canvas color.
     */
    canvas: string
    /**
     * The color mode of the app
     */
    colorMode: 'dark' | 'light'
    /**
     * The filters applied to the collection
     */
    filters: {
      /**
       * Whether to hide icons that restrict via cors
       */
      'hide-cors': boolean
      /**
       * Whether to show the name of the icon on the card
       */
      'show-name': boolean
      /**
       * Show or hide the size of the icon on the card
       */
      'show-size': boolean
    }
    /**
     * The size of the icons in the collection
     */
    size: number
    /**
     * The sort order of the collection
     */
    sort:
      | 'alphabetical-asc'
      | 'alphabetical-desc'
      | 'file-asc'
      | 'file-desc'
      | 'last-asc'
      | 'last-desc'
      | 'none'
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
   * The svg data from storage.
   */
  svg: StorageSvg
  /**
   * The user state from storage.
   */
  user: UserState
}

/**
 * The database keys
 */
export type DatabaseKey = 'collections' | 'plugins' | 'user' | 'view'

/**
 * The model for SVG files imported from the local file system.
 */
export type FileSvg = {
  /**
   * The file name of the SVG file
   */
  name: string
  /**
   * The SVG string of the file
   */
  svg: string
}
