import { createDownload } from './create-download'
import { addOverlay } from './util'
import { insertXlinkIcon, insertIcon } from './create-icon'

//////////////////
// Create a btn for each svg element
export const createButtons = svgInfo => {
  // Create page container
  const container = document.createElement('div')
  container.setAttribute('class', 'gobbler')
  container.setAttribute('id', 'gobblegobble')

  // Append container after body
  document.body.insertAdjacentElement('beforeend', container)

  // Create icon sprite and append as first element
  insertXlinkIcon(container)

  svgInfo.forEach((svg, id) => {
    // create overlay and container
    const svgContainer = document.createElement('div')
    svgContainer.setAttribute('class', 'gobbler__overlay')

    // attach to body container
    container.appendChild(svgContainer)

    // process svg coordinates in viewport
    addOverlay(svg.element, svgContainer)

    // Insert icon
    insertIcon(svgContainer)

    // const btn = document.createElement('button')
    // btn.setAttribute('data-source-id', id)
    // btn.setAttribute('class', 'gobbler__icon')
    // btn.textContent = 'Download'
    // svgContainer.appendChild(btn)

    // // Set onclick for btn
    // btn.onclick = () => {
    //   createDownload(svg)
    // }
  })
}
