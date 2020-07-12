import FileSaver from 'file-saver'
import JSZip from 'jszip'

import SVGO from 'svgo'

const svgo = new SVGO({ removeViewBox: false, removeDimensions: true })

const download = {
  original(i) {
    const blob = new Blob([i.svgString], { type: 'text/xml' })
    FileSaver.saveAs(blob, 'gobbler-icon.svg')
  },

  copyOriginal(i) {
    const el = document.createElement('textarea')
    el.value = i.svgString
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  },

  optimized(i) {
    svgo.optimize(i.svgString).then(result => {
      const blob = new Blob([result.data], { type: 'text/xml' })
      FileSaver.saveAs(blob, 'gobbler-icon.svg')
      console.log(result.data)
    })
  },

  copyOptimized(i) {
    const el = document.createElement('textarea')
    svgo.optimize(i.svgString).then(result => {
      el.value = result.data
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })
  },

  all(i) {
    const zip = new JSZip()
    const optiArr = i.map(async svg => {
      const o = await svgo.optimize(svg.svgString)
      return o.data
    })

    optiArr.forEach((svg, index) => {
      zip.file(`svg-${index}.svg`, svg)
    })
    zip.generateAsync({ type: 'blob' }).then(content => {
      FileSaver.saveAs(content, 'gobbled_svgs.zip')
    })
  },
}

export default download
