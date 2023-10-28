import { PageData } from 'types'
import { GElement } from './g-element'
import { Inline } from './inline'
import { Svg } from './svg'
import { Symbol } from './symbol'

/**
 * The SVG factory will process the page data and return an array of SVG objects.
 */
class SvgFactory {
  /**
   * Process the page data and return an array of SVG objects.
   */
  process(pageData: PageData) {
    const processedData = [] as Svg[]

    pageData.data.map((item) => {
      switch (true) {
        case item.includes('svg'): {
          // Ensure it is an inline SVG and not a sprite via <use>
          // If it is a sprite, it will be processed as a symbol or g element
          if (!item.includes('<use ')) {
            processedData.push(new Inline(item, pageData.origin))
          }
          break
        }

        case item.includes('<symbol '): {
          processedData.push(new Symbol(item, pageData.origin))
          break
        }

        case item.includes('<g '): {
          processedData.push(new GElement(item, pageData.origin))
          break
        }
      }
    })

    return processedData.filter((item) => item.isValid)
  }
}

export default new SvgFactory()
