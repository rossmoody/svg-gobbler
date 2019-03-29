import { findSVGs } from './find-svgs'
import { getInfo } from './get-info'
import { getSources } from './get-sources'
import { createButtons } from './create-buttons'

///////////////
// Removes the gobbler container on scroll
function removeDaGobbler () {
  const gobbler = document.getElementById('gobblegobble')

  // Remove the container
  function removeAllTheGobbles () {
    gobbler.remove()
  }

  // Event listener
  window.addEventListener('scroll', removeAllTheGobbles, { once: true })
}

//////
// Does all the things
export const init = () => {
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
