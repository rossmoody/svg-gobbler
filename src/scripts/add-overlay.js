export function addOverlay(el, cont) {
  // Absolutely position a div over each client rect
  // Note: the overlays will be out of place if the user resizes or zooms
  const rects = el.getClientRects()
  for (let i = 0; i != rects.length; i++) {
    const rect = rects[i]
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    const scrollLeft =
      document.documentElement.scrollLeft || document.body.scrollLeft
    cont.style.top = rect.top + scrollTop + 'px'
    cont.style.left = rect.left + scrollLeft + 'px'
    cont.style.width = rect.width + 'px'
    cont.style.height = rect.height + 'px'
  }
}
