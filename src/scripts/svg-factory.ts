import { GElement } from './classes/g-element'
import { Image } from './classes/image'
import { Inline } from './classes/inline'
import { SvgSymbol } from './classes/symbol'
import { DocumentData, SvgType } from './types'

/**
 * The primary SVG factory that processes document data and returns an array of SVG classes.
 */
class SvgFactory {
  /**
   * Process a single SVG element and return an SVG class.
   */
  private createSvgElement(
    svg: string,
    id: string,
    lastEdited: string,
    origin: string,
    name: string,
  ): SvgType | null {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(svg, 'image/svg+xml')
      const { tagName } = doc.documentElement

      switch (tagName) {
        case 'svg':
          return new Inline(svg, id, lastEdited, name)
        case 'symbol':
          return new SvgSymbol(svg, id, lastEdited, name)
        case 'g':
          return new GElement(svg, id, lastEdited, name)
        case 'img':
          return new Image(svg, id, lastEdited, origin, name)
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
    elements?.forEach((element) => {
      const constructor = selector === 'symbol' ? SvgSymbol : GElement
      results.push(new constructor(element.outerHTML, image.id, image.lastEdited, image.name))
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
      .map(({ id, lastEdited = new Date().toISOString(), name, svg }) =>
        this.createSvgElement(svg, id, lastEdited, message.origin, name),
      )
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
