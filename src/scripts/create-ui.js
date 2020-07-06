import createCards from './create-card'
import download from './download'

const createUI = data => {
  const container = document.querySelector('.gob__container')
  const countCont = document.querySelector('.gob__countCont')

  // Create SVG Counter
  function isPlural() {
    return data.length === 1
      ? `Download ${data.length} SVG`
      : `Download ${data.length} SVGs`
  }

  const gobCount = document.createElement('button')

  gobCount.className = 'gob__count--svg'
  gobCount.innerHTML = isPlural()
  gobCount.addEventListener('click', () => {
    download.downloadAll(data)
  })

  countCont.appendChild(gobCount)

  createCards(data, container)
}

export default createUI
