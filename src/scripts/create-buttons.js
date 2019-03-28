import { createDownload } from './create-download'
import { addOverlay } from './util'
import { insertXlinkIcon } from './create-icon'

//////////////////
// Create a btn for each svg element
export const createButtons = svgInfo => {
  // Create page container
  const container = document.createElement('div')
  container.setAttribute('class', 'gobbler')
  container.setAttribute('id', 'gobblegobble')

  // Append container after body
  document.body.insertAdjacentElement('afterend', container)

  // Create icon sprite and append as first element
  insertXlinkIcon(container)

  svgInfo.forEach((svg, id) => {
    const btnContainer = document.createElement('div')
    btnContainer.setAttribute('class', 'gobbler__overlay')

    // process svg coordinates in viewport
    addOverlay(svg.element, btnContainer)

    // attach to container
    container.appendChild(btnContainer)

    // This will change, but sets download btn
    const btn = document.createElement('button')
    btn.setAttribute('data-source-id', id)
    btn.setAttribute('class', 'gobbler__icon')
    btn.textContent = 'Download'
    btnContainer.appendChild(btn)

    // Set onclick for btn
    btn.onclick = () => {
      createDownload(svg)
    }
  })
}
