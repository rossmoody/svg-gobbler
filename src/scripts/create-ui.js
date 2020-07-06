import createCards from './create-card'
import download from './download'

require('../styles/index.scss')

// Element creation helper
function createElement(el, elClass) {
  const i = document.createElement(el)
  i.className = elClass
  return i
}

const createUI = data => {
  const container = document.querySelector('.gob__container')
  const countCont = document.querySelector('.gob__countCont')

  // Create SVG Counter
  function isPlural() {
    return data.length === 1
      ? `Download ${data.length} SVG`
      : `Download ${data.length} SVGs`
  }

  const gobCount = createElement('button', 'gob__count--svg')
  gobCount.innerHTML = isPlural()
  countCont.appendChild(gobCount)
  gobCount.addEventListener('click', () => {
    download.downloadAll(data)
  })

  createCards(data, container)
}

export default createUI
