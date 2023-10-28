import { PageData } from 'types'
import { Inline } from './inline'
import { Svg } from './svg'

/**
 * The SVG factory will process the page data and return an array of SVG objects.
 */
class SvgFactory {
  process(pageData: PageData) {
    const processedData = [] as Svg[]

    pageData.data.map((item) => {
      switch (true) {
        case item.includes('svg'): {
          processedData.push(new Inline(item, pageData.origin))
        }
      }
    })

    return processedData.filter((item) => item.isValid)
  }
}

export default new SvgFactory()
