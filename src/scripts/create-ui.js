import createCards from './create-card'
import download from './download'

require('../styles/index.scss')

const createUI = data => {
  const nonCors = data.filter(svg => !svg.cors)

  const container = document.querySelector('.gob__container')
  const countCont = document.querySelector('.gob__countCont')

  function isPlural(i) {
    return i === 1 ? '' : 's'
  }

  function getAvailable() {
    return `Download ${nonCors.length} available SVG${isPlural(nonCors.length)}`
  }

  function buildShowingString() {
    return `Found ${data.length} SVG${isPlural(data.length)} on ${
      data[0].location
    }`
  }

  const gobCount = document.createElement('button')
  gobCount.className = 'gob__count--svg'
  gobCount.innerHTML = getAvailable()
  gobCount.addEventListener('click', () => {
    download.all(nonCors)
  })

  const svgCount = document.createElement('span')
  svgCount.className = 'gob__mast__count'
  svgCount.innerHTML = buildShowingString()

  window.document.querySelector('.gob__mast').appendChild(svgCount)
  countCont.appendChild(gobCount)

  createCards(data, container)
}

export default createUI
