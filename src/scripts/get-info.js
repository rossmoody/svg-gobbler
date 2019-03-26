import { prettyName } from './util'

export const getInfo = allSVGs => {
  // the array that holds all the svg info
  const svgInfo = []

  allSVGs.forEach(i => {
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
      filename: filename,
      element: i,
      srctype: i.srctype
    })
  })

  return svgInfo
}
