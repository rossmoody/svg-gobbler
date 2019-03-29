import { createDownload } from './create-download'

///////////////
// Add overlay element to viewport baed on SVG position
function addOverlay (el, cont) {
  var rects = el.getBoundingClientRect()
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  var scrollLeft =
    document.documentElement.scrollLeft || document.body.scrollLeft
  cont.style.margin = cont.style.padding = '0'
  cont.style.top = rects.top + scrollTop + 'px'
  cont.style.left = rects.left + scrollLeft + 'px'
  // We want rect.width to be the border width, so content width is 2px less.
  cont.style.width = rects.width - 2 + 'px'
  cont.style.height = rects.height - 2 + 'px'
}

//////////////////
// Create a btn for each svg element
export const createButtons = svgInfo => {
  // Create page container
  const container = document.createElement('div')
  container.setAttribute('class', 'gobbler')
  container.setAttribute('id', 'gobblegobble')

  // Append container after body
  document.body.insertAdjacentElement('beforeend', container)

  svgInfo.forEach((svg, id) => {
    // create overlay and container
    const svgContainer = document.createElement('button')
    svgContainer.setAttribute('class', 'gobbler__overlay')
    svgContainer.setAttribute('data-source-id', id)

    // attach to body container
    container.appendChild(svgContainer)

    // process svg coordinates in viewport
    addOverlay(svg.element, svgContainer)

    // Set onclick for btn
    svgContainer.onclick = () => {
      createDownload(svg)
    }
  })
}
