import download from './download'

// Toggle success class
function toggleSuccess(el, btnClass) {
  el.classList.add('gob__btn--success')
  el.classList.add(btnClass)
  setTimeout(() => {
    el.classList.remove('gob__btn--success')
    el.classList.remove(btnClass)
  }, 1500)
}

// Element creation helper
function createElement(el, elClass, elPar = null, innH = null) {
  const i = window.document.createElement(el)
  i.className = elClass
  i.innerHTML = innH
  return elPar ? elPar.appendChild(i) : i
}

const createCards = (svgInfo, cont) => {
  // Create cards`
  svgInfo.forEach((el, i) => {
    // Create dom elements
    const gobblerCard = createElement('div', 'gob__card', cont)
    const gobblerCardClone = createElement('div', 'gob__card__svg', gobblerCard)
    const gobblerCardCloneWrapper = createElement(
      'div',
      'gob__card__svg__wrapper',
      gobblerCardClone
    )
    gobblerCardCloneWrapper.insertAdjacentHTML('afterbegin', el.origEleJson)
    const gobblerCardFooter = createElement(
      'div',
      'gob__card__footer',
      gobblerCard
    )
    const gobblerCardBtns = createElement('div', 'gob__btns', gobblerCardFooter)

    // Check if SVG has white attribute
    if (el.hasWhite) {
      gobblerCardClone.classList.add('gob__card__svg--white')
    }

    // Smooth card load
    setTimeout(() => {
      gobblerCard.classList.add('gob__card--show')
    }, 60 * i)

    // Create card warnings
    if (el.type === 'sprite') {
      const newTag = createElement('div', 'gob__tag--sprite')
      gobblerCard.appendChild(newTag)
    } else if (el.type === 'symbol') {
      const newTag = createElement('div', 'gob__tag--symbol')
      gobblerCard.appendChild(newTag)
    }

    // Create card footer
    createElement(
      'div',
      'gob__typecont',
      gobblerCardFooter,
      `<h4>Type</h4><h3>${el.type}</h3>`
    )

    createElement(
      'div',
      'gob__sizecont',
      gobblerCardFooter,
      `<h4>Size</h4><h3>${el.size}</h3>`
    )

    createElement('div', 'gob__attrcont', gobblerCardFooter)

    if (!el.cors) {
      // Download button
      const downloadButton = createElement('button', 'gob__btn')
      downloadButton.classList.add('gob__btn--download')
      downloadButton.addEventListener('click', () => {
        toggleSuccess(downloadButton, 'gob__btn--success--download')
        download.createRegDownload(el)
      })
      gobblerCardBtns.appendChild(downloadButton)

      // Copy button
      const copyButton = createElement('button', 'gob__btn')
      copyButton.classList.add('gob__btn--copy')
      copyButton.addEventListener('click', () => {
        toggleSuccess(copyButton, 'gob__btn--success--copy')
        download.copyRegClipboard(el)
      })
      gobblerCardBtns.appendChild(copyButton)
    } else {
      // adds alert to card
      const newTag = createElement('div', 'gob__tag--cors')
      gobblerCard.appendChild(newTag)

      // adds full width to button
      gobblerCardBtns.classList.add('gob__btns--block')

      // Same-origin policies button. opens svg in new window
      const corsBtn = createElement('a', 'gob__btn')
      corsBtn.classList.add('gob__btn--cors-btn')
      corsBtn.setAttribute('target', '_blank')
      corsBtn.setAttribute('href', el.url)

      gobblerCardBtns.appendChild(corsBtn)
    }
  })
}

export default createCards
