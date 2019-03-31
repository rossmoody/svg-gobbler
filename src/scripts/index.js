import '../styles/style.scss'
import { findSVGs } from './find-svgs'
import { getSources } from './get-sources'
import { createCards } from './create-cards'

//////
// Does all the things
function init () {
  const hasGobbles = document.querySelector( '.gobbler' )

  // stop lots of containers getting made
  if ( hasGobbles ) {
    console.log( 'gobble gobble' )
  } else {

    // Find and process all the svgs
    const allSVGs = findSVGs()

    // Log source information
    const svgInfo = getSources( allSVGs )

    setTimeout( () => {
      createCards( svgInfo )
    }, 1000 )
  }
}

init()
