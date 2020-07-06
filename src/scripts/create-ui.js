import createCards from './create-card'
import download from './download'

// Element creation helper
function createElement(el, elClass) {
  const i = document.createElement(el)
  i.className = elClass
  return i
}

const createUI = svgInfo => {
  const container = document.querySelector('.gob__container')
  const countCont = document.querySelector('.gob__countCont')

  // Create SVG Counter
  function isPlural() {
    return svgInfo.length === 1
      ? `Download ${svgInfo.length} SVG`
      : `Download ${svgInfo.length} SVGs`
  }

  const gobCount = createElement('button', 'gob__count--svg')
  gobCount.innerHTML = isPlural()
  countCont.appendChild(gobCount)
  gobCount.addEventListener('click', () => {
    download.downloadAll(svgInfo)
  })

  createCards(svgInfo, container)
}

export default createUI
