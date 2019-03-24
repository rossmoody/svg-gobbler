import { findSVGs } from './find-svgs'
import { getInfo } from './get-info'
import { getSources } from './get-sources'
import { createButtons } from './create-buttons'

export const gobbler = () => {
  // Find all the svgs
  const allSVGs = findSVGs()

  // Log svg info
  let svgInfo = getInfo(allSVGs)

  // Log source information
  svgInfo = getSources(svgInfo)

  // Create buttons
  createButtons(svgInfo)
}
