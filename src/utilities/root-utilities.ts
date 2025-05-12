import { CollectionState, UserState } from 'src/providers'
import { DocumentData, SvgType } from 'src/scripts'
import { type Collection, PageData } from 'src/types'

export const RootUtilities = {
  /**
   * Processes the fetched data and provides helpful insights for debugging.
   */
  createDebugData({ ...data }: DebugData) {
    const debug: Record<string, unknown> = {}

    debug['Number of SVG Strings found'] = data.pageData.data.length
    debug['Number of SVGs created'] = data.svgClasses.length

    const classes: Record<string, SvgType[]> = {}
    for (const svg of data.svgClasses) {
      if (!classes[svg.svgType]) {
        classes[svg.svgType] = []
      }
      classes[svg.svgType].push(svg)
    }

    debug['SVG Classes'] = classes

    debug['User State:'] = data.user
    debug['View State:'] = data.view
    debug['Page Data:'] = data.pageData

    return debug
  },

  /**
   * Finds the existing collection based on the URL.
   */
  getExistingCollection: (url: string, collections: Collection[]) => {
    return collections.find((u) => u.href === url)
  },

  /**
   * Returns true if the URL is a duplicate in the collection array.
   */
  isDuplicateURL: (url: string, collections: Collection[]) => {
    return collections.some((u) => u.href === url)
  },

  /**
   * Merges the SVG content of the new page with the existing page data
   * based on unique SVG strings.
   */
  mergePageData: (existingPageData: PageData, newPageData: PageData): PageData => {
    const mergedSvgs = [...existingPageData.data, ...newPageData.data].filter(
      (svg, index, self) => self.findIndex((s) => s.svg === svg.svg) === index,
    )

    return {
      ...existingPageData,
      data: mergedSvgs,
    }
  },
}

type DebugData = {
  collections: Collection[]
  pageData: DocumentData
  svgClasses: SvgType[]
  user: UserState
  view: CollectionState['view']
}
