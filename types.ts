export type ContentMessage = {
  /**
   * The type of page the message is originating from.
   */
  page: 'default' | 'system'
}

export type BackgroundMessage = {
  /**
   * The data gathered from the active tab
   */
  data: PageData
}

export type PageData = {
  data: string[]
  host: string
  origin: string
}
