import '../styles/style.scss'
import { findSVGs } from './find-svgs'
import { getSources } from './get-sources'
import { createCards } from './create-cards'

//////
// Does all the things
async function init () {
  const hasGobbles = document.querySelector( '.gobbler' )
  const overlay = document.querySelector( '.gobbler__overlay' )

  // stop lots of containers getting made
  if ( hasGobbles ) {
    console.log( 'gobble gobble' )
  } else {

    // Find and process all the svgs
    const allSVGs = findSVGs()

    // Log source information
    const svgInfo = await getSources( allSVGs )

    // Create the interactive card elements
    createCards( svgInfo )

    // Click on overlay to close
    overlay.addEventListener( 'click', function () {
      hasGobbles.remove()
    } )
  }
}

init()
