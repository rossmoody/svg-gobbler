import type { PageData, SvgType } from 'src/types'
import { logger } from 'src/utils/logger'
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

    logger.info('Processed data: ', processedData)

    // Filter out invalid items after async processing absolute urls
    return processedData.filter((item) => item?.isValid) as SvgType[]
  }
}

export default new SvgFactory()
