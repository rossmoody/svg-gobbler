import { PageData } from 'types'
import { GElement } from './g-element'
import { Image } from './image'
import { Inline } from './inline'
import { Symbol } from './symbol'

/**
 * The SVG factory will process the page data and return an array of SVG objects.
 */
class SvgFactory {
  /**
   * Process the page data and return an array of SVG objects.
   */
  async process(message: PageData) {
    const processedData = message.data
      .map((item) => {
        switch (true) {
          case item.includes('<svg ') && !item.includes('<use '): {
            return new Inline(item, message.origin)
          }

          case item.includes('<symbol '): {
            return new Symbol(item, message.origin)
          }

          case item.includes('<g '): {
            return new GElement(item, message.origin)
          }

          case item.includes('<img '): {
            return new Image(item, message.origin)
          }
        }
      })
      .filter((item) => item?.isValid)

    return Promise.all(
      processedData.map((item) => {
        if (item instanceof Image) {
          return item.fetchSvgContent()
        }
        return item
      }),
    ).catch(() => {
      return processedData
    })
  }
}

export default new SvgFactory()
