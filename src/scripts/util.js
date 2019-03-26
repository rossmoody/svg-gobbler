export function prettyName(uglyName) {
  return uglyName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
}

export function hasBgImg(el) {
  const style = window.getComputedStyle(el, null)
  if (style.backgroundImage !== 'none') {
    return true
  }
}
