import { createDownload } from './create-download'

export const createButtons = svgInfo => {
  const container = document.createElement('div')
  container.setAttribute('class', 'svg-gobbler')
  document.body.appendChild(container)

  svgInfo.forEach((svg, id) => {
    const btnContainer = document.createElement('div')
    container.appendChild(btnContainer)
    btnContainer.setAttribute('class', 'svg-gobbler__btn-container')
    btnContainer.style['top'] = `${svg.top + document.body.scrollTop}px`
    btnContainer.style['left'] = `${svg.left + document.body.scrollLeft}px`

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
