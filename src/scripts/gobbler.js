import { findSVGs } from './find-svgs'
import { getInfo } from './get-info'
import { getSources } from './get-sources'
import { createButtons } from './create-buttons'
import { removeDaGobbler } from './close-gobbler'

// Does all the things
export const gobbler = () => {
  const hasGobbles = document.getElementById('gobblegobble')

  // stop lots of containers getting made
  if (hasGobbles) {
    console.log('gobble gobble')
  } else {
    // Find and process all the svgs
    const allSVGs = findSVGs()

    // Serialize the svg information
    let svgInfo = getInfo(allSVGs)

    // Log source information
    svgInfo = getSources(svgInfo)

    // Create buttons
    createButtons(svgInfo)

    // Scroll listener
    removeDaGobbler()
  }
}
