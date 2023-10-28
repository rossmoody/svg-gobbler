/**
 * The message sent from the Content script to the Background script.
 */
export type ContentMessage = {}

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
   * dasbhoard in the extension.
   */
  host: string
  /**
   * The origin of the active tab. This is used to rebuild the SVGs in the
   * content script. Especially related to image sources and cors restrictions.
   */
  origin: string
}
