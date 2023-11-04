import { Image } from 'scripts/svg-factory/image'
import svgFactory from 'scripts/svg-factory/svg-factory'
import type { PageData } from 'types'
import { logger } from './logger'

/**
 * A development utility to look for malformed SVGs in the collection and log them.
 */
export const svgFactoryChecker = async (pageData: PageData) => {
  if (process.env.NODE_ENV === 'development') {
    const processedData = await svgFactory.process(pageData)

    const malformedData = processedData.filter((svg) => {
      // Check if first characters of string are <svg
      // This is a quick check to see if the string is an SVG
      if (svg?.originalString.slice(0, 4) !== '<svg') {
        return true
      }

      // Check if absolute URL is valid
      if ((svg as Image).absoluteImageUrl) {
        return true
      }
    })

    logger.info(malformedData)
  }
}
