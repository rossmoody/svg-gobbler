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

    const processedData = message.data
      .map(({ svg, id }) => {
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
      .filter((item) => item && item.isValid)

    const result = await Promise.all(
      processedData.map((item) => {
        if (item instanceof Image) {
          return item.fetchSvgContent()
        }
        return item
      }),
    ).catch(() => {
      return processedData
    })

    // Filter out invalid items after async processing absolute urls
    return result.filter((item) => item?.isValid) as SvgType[]
  }
}

export default new SvgFactory()
