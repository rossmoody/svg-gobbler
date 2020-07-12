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

// Create element helper
const make = {
  element(el, cName) {
    const result = window.document.createElement(el)
    result.className = cName
    return result
  },

  downloadBtn(svg) {
    const btn = make.element('button', 'gob__btn')
    btn.classList.add('gob__btn--download')
    btn.addEventListener('click', () => {
      toggleSuccess(btn, 'gob__btn--success--download')
      download.optimized(svg)
    })

    return btn
  },

  copyBtn(svg) {
    const copyBtn = make.element('button', 'gob__btn')
    copyBtn.classList.add('gob__btn--copy')
    copyBtn.addEventListener('click', () => {
      toggleSuccess(copyBtn, 'gob__btn--success--copy')
      download.copyOptimized(svg)
    })

    return copyBtn
  },

  moreBtn() {
    const moreBtn = make.element('button', 'gob__btn')
    const moreIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 15a3 3 0 100-6 3 3 0 000 6zm9 0a3 3 0 100-6 3 3 0 000 6zm12-3a3 3 0 11-6 0 3 3 0 016 0z" fill="currentColor"/></svg>`
    moreBtn.classList.add('gob__btn--more')
    moreBtn.insertAdjacentHTML('afterbegin', moreIcon)

    return moreBtn
  },
}

function createMenu() {
  const listItems = ['Download original', 'Copy original']
  const menu = make.element('div', 'gob__menu')
  const menuUl = make.element('ul', 'gob__menu-ul')

  for (const item of listItems) {
    console.log(item)
    const li = document.createElement('li')
    li.textContent = item
    menuUl.appendChild(li)
  }

  menu.appendChild(menuUl)
  return menu
}

const createCards = (svgInfo, cont) => {
  // Create cards`
  svgInfo.forEach((svg, index) => {
    // Create dom elements
    const card = make.element('div', 'gob__card')
    cont.appendChild(card)

    const svgCont = make.element('div', 'gob__card__svg')
    if (svg.hasWhite) svgCont.classList.add('gob__card__svg--white')
    card.appendChild(svgCont)

    const svgWrapper = make.element('div', 'gob__card__svg__wrapper')
    svgWrapper.insertAdjacentHTML('afterbegin', svg.presentationSvg)
    svgCont.appendChild(svgWrapper)

    const footer = make.element('div', 'gob__card__footer')
    card.appendChild(footer)

    const btnCont = make.element('div', 'gob__btns')
    footer.appendChild(btnCont)

    // Smooth card load
    setTimeout(() => {
      card.classList.add('gob__card--show')
    }, 60 * index)

    // Create card warnings
    if (svg.type === 'symbol') {
      const newTag = make.element('div', 'gob__tag--symbol')
      card.appendChild(newTag)
    }

    const svgType = make.element('div', 'gob__typecont')
    svgType.innerHTML = `<h4>Type</h4><h3>${svg.type}</h3>`
    footer.appendChild(svgType)

    const svgSize = make.element('div', 'gob__sizecont')
    svgSize.innerHTML = `<h4>Size</h4><h3>${svg.size}</h3>`
    footer.appendChild(svgSize)

    if (!svg.cors) {
      btnCont.appendChild(make.downloadBtn(svg))
      btnCont.appendChild(make.copyBtn(svg))
      btnCont.appendChild(make.moreBtn())
      btnCont.appendChild(createMenu())
    } else {
      // Adds alert to card
      const newTag = make.element('div', 'gob__tag--cors')
      card.appendChild(newTag)

      // Adds full width to button
      btnCont.classList.add('gob__btns--block')

      // Same-origin policies button. opens svg in new window
      const corsBtn = make.element('a', 'gob__btn')
      corsBtn.classList.add('gob__btn--cors-btn')
      corsBtn.setAttribute('target', '_blank')
      corsBtn.setAttribute('href', svg.url)

      btnCont.appendChild(corsBtn)
    }
  })
}

export default createCards
