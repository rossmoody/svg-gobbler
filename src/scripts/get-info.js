export const getInfo = allSVGs => {
  const svgInfo = []

  allSVGs.forEach(i => {
    const svgLoc = i.getBoundingClientRect()

    // iterate through for filename
    let filename = window.document.title
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
    if (i.name) {
      filename = i.name
    } else if (i.alt) {
      filename = i.alt
    } else if (i.id) {
      filename = i.id
    } else if (i.className) {
      filename = i.className
    }

    // all the info collected and used for svgs
    svgInfo.push({
      top: svgLoc.top,
      left: svgLoc.left,
      name: filename,
      element: i,
      parent: i.parentElement
    })
  })

  return svgInfo
}
