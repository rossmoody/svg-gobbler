import { createDownload } from './create-download'
import { addOverlay } from './add-overlay'

//////////////////
// Create a btn for each svg element
export const createButtons = svgInfo => {
  // Create page container
  const container = document.createElement('div')
  container.setAttribute('class', 'gobbler')
  container.setAttribute('id', 'gobblegobble')
  // Attach container after body
  document.body.insertAdjacentElement('afterend', container)

  svgInfo.forEach((svg, id) => {
    // create overlay element fro svg
    const btnContainer = document.createElement('div')
    btnContainer.setAttribute('class', 'gobbler__overlay')

    // process svg coordinates in viewport
    addOverlay(svg.element, btnContainer)

    // attach to container
    container.appendChild(btnContainer)

    // This will change, but sets download btn
    const btn = document.createElement('button')
    btn.setAttribute('data-source-id', id)
    btn.setAttribute('class', 'gobbler__btn')
    btn.textContent = 'Download'
    btnContainer.appendChild(btn)

    // Set onclick for btn
    btn.onclick = () => {
      createDownload(svg)
    }
  })
}
