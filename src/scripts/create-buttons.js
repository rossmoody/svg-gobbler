import { createDownload } from './create-download'

export const createButtons = svgInfo => {
  svgInfo.forEach((svg, id) => {
    const btnContainer = document.createElement('div')
    svg.parent.appendChild(btnContainer)
    btnContainer.setAttribute('class', 'svg-gobbler__btn-container')

    const btn = document.createElement('button')
    btnContainer.appendChild(btn)
    btn.setAttribute('class', 'svg-gobbler__btn-container__btn')
    btn.setAttribute('data-source-id', id)
    btn.textContent = 'Download'

    btn.onclick = () => {
      createDownload(svg)
    }
  })
}
