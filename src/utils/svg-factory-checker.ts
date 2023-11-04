import svgFactory from 'scripts/svg-factory/svg-factory'
import type { PageData } from 'types'

/**
 * A development utility to look for malformed SVGs in the collection and log them.
 */
export const svgFactoryChecker = async (pageData: PageData) => {
  if (process.env.NODE_ENV === 'development') {
    const processedData = await svgFactory.process(pageData)

    const malformedData = processedData.filter((svg) => {
      if (svg === undefined) return true

      // Check if first characters of string are <svg
      // This is a quick check to see if the string is an SVG
      if (svg.originalString.slice(0, 4) !== '<svg') {
        return true
      }
    })

    console.log('Malformed data:', malformedData)
  }
}
