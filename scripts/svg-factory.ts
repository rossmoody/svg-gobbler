import { nanoid } from 'nanoid'
import type { PageData, SvgType } from 'src/types'
import { GElement } from './svg-classes/g-element'
import { Image } from './svg-classes/image'
import { Inline } from './svg-classes/inline'
import { SvgSymbol } from './svg-classes/symbol'

/**
 * The SVG factory will process the page data and return an array of SVG objects.
 */
class SvgFactory {
  /**
   * Process the page data and return an array of SVG objects.
   */
  async process(message: PageData | null) {
    if (!message) {
      return []
    }

    let processedData = message.data.map(({ svg, id }) => {
      switch (true) {
        case svg.includes('<svg '): {
          return new Inline(svg, id)
        }

        case svg.includes('<symbol '): {
          return new SvgSymbol(svg, id)
        }

        case svg.includes('<g '): {
          return new GElement(svg, id)
        }

        case svg.includes('<img '): {
          return new Image(svg, id, message.origin)
        }
      }
    })

    processedData = await Promise.all(
      processedData.map((item) => {
        if (item instanceof Image) {
          return item.fetchSvgContent()
        }
        return item
      }),
    ).catch(() => {
      return processedData
    })

    // Must do one final pass after async requests to break apart remote
    // SVG sprites into their individual SVGs, symbols, or g elements
    processedData = processedData
      .filter((item) => item && item?.isValid)
      .flatMap((item) => {
        if (item instanceof Image) {
          const results = [item] as SvgType[]

          const symbols = item.asElement?.querySelectorAll('symbol')
          symbols?.forEach((symbol) => {
            results.push(new SvgSymbol(symbol.outerHTML, nanoid()))
          })

          const gElements = item.asElement?.querySelectorAll('g')
          gElements?.forEach((gElement) => {
            results.push(new GElement(gElement.outerHTML, nanoid()))
          })

          return results
        }

        return item
      })

    return processedData as SvgType[]
  }
}

export default new SvgFactory()
