import { type Collection, PageData } from 'src/types'

export class RootUtils {
  /**
   * Finds the existing collection based on the URL.
   */
  static getExistingCollection = (url: string, collections: Collection[]) => {
    return collections.find((u) => u.href === url)
  }

  /**
   * Returns true if the URL is a duplicate in the collection array.
   */
  static isDuplicateURL = (url: string, collections: Collection[]) => {
    return collections.some((u) => u.href === url)
  }

  /**
   * Merges the SVG content of the new page with the existing page data
   * based on unique SVG strings.
   */
  static mergePageData = (existingPageData: PageData, newPageData: PageData): PageData => {
    const mergedSvgs = existingPageData.data
      .concat(newPageData.data)
      .filter((svg, index, self) => self.findIndex((s) => s.svg === svg.svg) === index)

    return {
      ...existingPageData,
      data: mergedSvgs,
    }
  }
}
