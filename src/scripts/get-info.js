import { prettyName } from './util'

export const getInfo = allSVGs => {
  // console.log(foo)
  const svgInfo = []

  allSVGs.forEach(i => {
    const svgLoc = i.getBoundingClientRect()

    // iterate through for filename
    let filename = 'gobble'
    if (i.alt) {
      filename = prettyName(i.alt)
    } else if (i.id) {
      filename = prettyName(i.id)
    } else if (window.document.title) {
      filename = prettyName(window.document.title)
    }

    // all the info collected and used for svgs
    svgInfo.push({
      top: svgLoc.top,
      left: svgLoc.left,
      filename: filename,
      element: i,
      parent: i.parentElement
    })
  })

  return svgInfo
}
