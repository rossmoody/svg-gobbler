export function createButtons(btns, svg) {
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
  function createElement(el, elClass) {
    const i = document.createElement(el)
    i.classList.add(elClass)
    return i
  }

  const dOpti = createElement('button', 'gob__btn')
  dOpti.classList.add('gob__btn--download')
  dOpti.addEventListener('click', function() {
    toggleSuccess(dOpti, 'gob__btn--success--download')
    svg.createOptiDownload()
  })
  btns.appendChild(dOpti)

  const cOpti = createElement('button', 'gob__btn')
  cOpti.classList.add('gob__btn--copy')
  cOpti.addEventListener('click', function() {
    toggleSuccess(cOpti, 'gob__btn--success--copy')
    svg.copyOptiClipboard()
  })
  btns.appendChild(cOpti)
}
