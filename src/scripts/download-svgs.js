import FileSaver from 'file-saver'

import SVGO from 'svgo'

const svgo = new SVGO({
  multipass: true,
  plugins: [
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      cleanUpEnableBackground: true,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: true,
    },
    {
      cleanupNumericValues: true,
    },
    {
      moveElemsAttrsToGroup: true,
    },
    {
      moveGroupAttrsToElems: true,
    },
    {
      collapseGroups: true,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: false,
    },
    {
      sortAttrs: true,
    },
    {
      transformsWithOnePath: false,
    },
    {
      removeDimensions: false,
    },
    {
      removeAttrs: false,
    },
  ],
})

// Make filename from site domain
function fileName() {
  let site = document.domain
  // prefixes
  site = site.replace(/https|www|http/g, '')
  // suffixes
  site = site.replace(
    /\.|com|gov|com|net|org|info|coop|int|co\.uk|org\.uk|ac\.uk|uk/g,
    ''
  )
  return `icon-${site}`
}

class ButtonHandler {
  createOptiDownload(i) {
    const filename = fileName()
    svgo.optimize(i.svgString).then(function(result) {
      let blob = new Blob([result.data], { type: 'text/xml' })
      FileSaver.saveAs(blob, `${filename}.svg`)
    })
  }

  createOptimizedExportedDownload(i, fileExt) {
    const filename = fileName()
    svgo.optimize(i.svgString).then(function(result) {
      const canvas = document.createElement('canvas')
      canvas.width = i.svgXml.width.baseVal.value
      canvas.height = i.svgXml.height.baseVal.value
      canvas.style.width = i.svgXml.width.baseVal.value
      canvas.style.height = i.svgXml.height.baseVal.value
      const ctx = canvas.getContext('2d')
      const img = document.createElement('img')
      img.setAttribute(
        'src',
        'data:image/svg+xml;base64,' +
          btoa(unescape(encodeURIComponent(result.data)))
      )
      img.onload = function() {
        ctx.drawImage(img, 0, 0)
        let imgURI = canvas.toDataURL('image/' + fileExt, 1)
        FileSaver.saveAs(imgURI, `${filename}.${fileExt}`)
      }
    })
  }

  createRegDownload(i) {
    let blob = new Blob([i.svgString], { type: 'text/xml' })
    FileSaver.saveAs(blob, `${filename}.svg`)
  }

  copyOptiClipboard(i) {
    svgo.optimize(i.svgString).then(function(result) {
      const el = document.createElement('textarea')
      el.value = result.data
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })
  }

  copyRegClipboard(i) {
    const el = document.createElement('textarea')
    el.value = i.svgString
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}

export const download = new ButtonHandler()
