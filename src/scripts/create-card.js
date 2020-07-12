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

const create = {
  element(el, cName) {
    const result = window.document.createElement(el)
    result.className = cName
    return result
  },
}

const createCards = (svgInfo, cont) => {
  // Create cards`

  svgInfo.forEach((svg, index) => {
    // Create dom elements
    const card = create.element('div', 'gob__card')
    cont.appendChild(card)

    const svgCont = create.element('div', 'gob__card__svg')
    card.appendChild(svgCont)

    // Check if SVG has white
    if (svg.hasWhite) {
      svgCont.classList.add('gob__card__svg--white')
    }

    const svgWrapper = create.element('div', 'gob__card__svg__wrapper')
    svgWrapper.insertAdjacentHTML('afterbegin', svg.presentationSvg)
    svgCont.appendChild(svgWrapper)

    const footer = create.element('div', 'gob__card__footer')
    card.appendChild(footer)

    const btnCont = create.element('div', 'gob__btns')
    footer.appendChild(btnCont)

    // Smooth card load
    setTimeout(() => {
      card.classList.add('gob__card--show')
    }, 60 * index)

    // Create card warnings
    if (svg.type === 'symbol') {
      const newTag = create.element('div', 'gob__tag--symbol')
      card.appendChild(newTag)
    }

    const svgType = create.element('div', 'gob__typecont')
    svgType.innerHTML = `<h4>Type</h4><h3>${svg.type}</h3>`
    footer.appendChild(svgType)

    const svgSize = create.element('div', 'gob__sizecont')
    svgSize.innerHTML = `<h4>Size</h4><h3>${svg.size}</h3>`
    footer.appendChild(svgSize)

    if (!svg.cors) {
      // Download button
      const downloadButton = create.element('button', 'gob__btn')
      downloadButton.classList.add('gob__btn--download')
      downloadButton.addEventListener('click', () => {
        toggleSuccess(downloadButton, 'gob__btn--success--download')
        download.original(svg)
      })
      btnCont.appendChild(downloadButton)

      // Copy button
      const copyButton = create.element('button', 'gob__btn')
      copyButton.classList.add('gob__btn--copy')
      copyButton.addEventListener('click', () => {
        toggleSuccess(copyButton, 'gob__btn--success--copy')
        download.copyOriginal(svg)
      })
      btnCont.appendChild(copyButton)
    } else {
      // adds alert to card
      const newTag = create.element('div', 'gob__tag--cors')
      card.appendChild(newTag)

      // adds full width to button
      btnCont.classList.add('gob__btns--block')

      // Same-origin policies button. opens svg in new window
      const corsBtn = create.element('a', 'gob__btn')
      corsBtn.classList.add('gob__btn--cors-btn')
      corsBtn.setAttribute('target', '_blank')
      corsBtn.setAttribute('href', svg.url)

      btnCont.appendChild(corsBtn)
    }
  })
}

export default createCards
