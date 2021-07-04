import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { optimize, extendDefaultPlugins } from 'svgo/dist/svgo.browser'

const svgoConfig = {
  plugins: extendDefaultPlugins([
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'removeDimensions',
      active: true,
    },
  ]),
}

export const handle = {
  downloadOriginal(svgString: string) {
    const blob = new Blob([svgString], { type: 'text/xml' })
    FileSaver.saveAs(blob, 'gobbler-original.svg')
  },

  downloadOptimized(svgString: string) {
    const { data } = optimize(svgString, svgoConfig)
    const blob = new Blob([data], { type: 'text/xml' })
    FileSaver.saveAs(blob, 'gobbler-icon.svg')
  },

  downloadAllSVGs(svgs: string[]) {
    const zip = new JSZip()

    const optimizedSVGs = svgs.map((svg) => {
      const { data } = optimize(svg, svgoConfig)
      return data
    })

    optimizedSVGs.forEach((svg, index) => {
      zip.file(`svg-${index}.svg`, svg)
    })

    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'gobbled_svgs.zip')
    })
  },

  copyToClipboard(svgString: string) {
    const el = document.createElement('textarea')
    el.value = svgString
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  },

  copyOptimized(svgString: string) {
    const { data } = optimize(svgString, svgoConfig)
    handle.copyToClipboard(data)
  },
}

//   img(i, width, height) {
//     const canvas = document.createElement('canvas')
//     const ctx = canvas.getContext('2d')
//     canvas.width = width
//     canvas.height = height
//     ctx.drawImage(i, 0, 0)
//     const dataUri = canvas.toDataURL('image/png', 0.9)
//     FileSaver.saveAs(dataUri, 'gobbler-image.png')
//   },
// }
