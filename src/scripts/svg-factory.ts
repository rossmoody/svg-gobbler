import { nanoid } from 'nanoid'

import { GElement } from './classes/g-element'
import { Image } from './classes/image'
import { Inline } from './classes/inline'
import { SvgSymbol } from './classes/symbol'
import { DocumentData, StorageSvg, SvgType } from './types'

/**
 * The primary SVG factory that processes document data and returns an array of SVG classes.
 */
class SvgFactory {
  /**
   * Process a single SVG element and return an SVG class.
   */
  private createSvgElement(storageSvg: StorageSvg, origin: string): SvgType | null {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(storageSvg.svg, 'image/svg+xml')
      const { tagName } = doc.documentElement

      switch (tagName) {
        case 'svg':
          return new Inline(storageSvg)
        case 'symbol':
          return new SvgSymbol(storageSvg)
        case 'g':
          return new GElement(storageSvg)
        case 'img':
          return new Image(storageSvg, origin)
        default:
          return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  /**
   * This is a helper function to extract the symbol and g elements from an image
   * after it has been fetched. This is necessary because the image element is
   * not in the DOM and therefore cannot be queried.
   */
  private expandImageToElements(item: SvgType): SvgType[] {
    if (item instanceof Image) {
      const results: SvgType[] = [item]
      this.extractAndPushElements(item, 'symbol', results)
      this.extractAndPushElements(item, 'g', results)
      return results
    }
    return [item]
  }

  private extractAndPushElements(image: Image, selector: 'g' | 'symbol', results: SvgType[]): void {
    const elements = image.asElement?.querySelectorAll(selector)
    elements?.forEach((element, i) => {
      const storageSvg: StorageSvg = {
        corsRestricted: image.corsRestricted,
        id: nanoid(),
        lastEdited: image.lastEdited,
        name: `${image.name}-${selector}-${i}`,
        svg: element.outerHTML,
      }

      const constructor = selector === 'symbol' ? SvgSymbol : GElement
      results.push(new constructor(storageSvg))
    })
  }

  /**
   * Filter out any invalid SVGs and expand any images into their constituent parts.
   */
  private processAsyncData(data: SvgType[]): SvgType[] {
    return data
      .filter((item) => item && item.isValid)
      .flatMap((item) => this.expandImageToElements(item))
  }

  /**
   * Process the page data and return an array of SVG classes.
   */
  async process(message: DocumentData | null): Promise<SvgType[]> {
    // If there's no message for whatever reason, return an empty array
    if (!message) {
      return []
    }

    // Create SVG elements from the message data
    const initialData: SvgType[] = message.data
      // Last edited is destructured with a default value to prevent undefined from old data
      .map((storageSvg) => this.createSvgElement(storageSvg, message.origin))
      .filter((item): item is SvgType => !!item)

    // If an item is an Image, fetch its SVG content; otherwise, leave it as is
    const promises = initialData.map((item) =>
      item instanceof Image ? item.fetchSvgContent() : Promise.resolve(item),
    )

    // Wait for all promises to resolve
    const resolvedData = await Promise.all(promises)

    // Process the resolved data and remove duplicates
    const uniqueData = [...new Set(this.processAsyncData(resolvedData))]

    return uniqueData
  }
}

export const svgFactory = new SvgFactory()
