export function addOverlay(el, cont) {
  var rects = el.getBoundingClientRect()
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  var scrollLeft =
    document.documentElement.scrollLeft || document.body.scrollLeft
  cont.style.margin = cont.style.padding = '0'
  cont.style.top = rects.top + scrollTop + 'px'
  cont.style.left = rects.left + scrollLeft + 'px'
  // We want rect.width to be the border width, so content width is 2px less.
  cont.style.width = rects.width - 2 + 'px'
  cont.style.height = rects.height - 2 + 'px'
}
