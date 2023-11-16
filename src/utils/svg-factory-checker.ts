import svgFactory from 'scripts/svg-factory'
import type { PageData } from 'src/types'

/**
 * A development utility to look for malformed SVGs in the collection and log them.
 */
export const svgFactoryChecker = async (pageData: PageData) => {
  if (process.env.NODE_ENV === 'development') {
    const processedData = await svgFactory.process(pageData)

    // console.log(
    //   'g element data:',
    //    _.filter(processedData, (svg) => svg instanceof GElement).map((svg) => svg?.originalString),
    // )

    console.log('Data: ', processedData)
  }
}
