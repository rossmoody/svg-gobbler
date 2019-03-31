import '../styles/style.scss'
import { findSVGs } from './find-svgs'
import { getSources } from './get-sources'
import { createCards } from './create-cards'

///////////////
// Removes the gobbler container on scroll
// function removeDaGobbler () {
//   const gobbler = document.getElementById( 'gobblegobble' )

//   // Remove the container
//   function removeAllTheGobbles () {
//     gobbler.remove()
//   }

//   // Event listener
//   window.addEventListener( 'scroll', removeAllTheGobbles, { once: true } )
// }

//////
// Does all the things
async function init () {
  const hasGobbles = document.querySelector( '.gobbler' )

  // stop lots of containers getting made
  if ( hasGobbles ) {
    console.log( 'gobble gobble' )
  } else {
    // Find and process all the svgs
    const allSVGs = await findSVGs()

    // Log source information
    const svgInfo = await getSources( allSVGs )

    console.log( svgInfo )

    // createCards( svgInfo )

    // Scroll listener
    // removeDaGobbler()
  }
}

init()
