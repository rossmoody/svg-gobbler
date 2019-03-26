import { createDownload } from './create-download'
import { addOverlay } from './add-overlay'

export const createButtons = svgInfo => {
  const container = document.createElement('div')
  container.setAttribute('class', 'gobbler')
  document.body.appendChild(container)

  svgInfo.forEach((svg, id) => {
    const btnContainer = document.createElement('div')
    const btn = document.createElement('button')

    // add the svg overlay element
    addOverlay(svg.element, btnContainer)

    container.appendChild(btnContainer)
    btnContainer.appendChild(btn)
    btnContainer.setAttribute('class', 'gobbler__cont')
    btn.setAttribute('class', 'gobbler__cont__btn')
    btn.setAttribute('data-source-id', id)
    btn.textContent = 'Download'

    btn.onclick = () => {
      createDownload(svg)
    }
  })
}
