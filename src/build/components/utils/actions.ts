import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { extendDefaultPlugins, optimize } from 'svgo/dist/svgo.browser'

const svgoConfig = {
  multipass: true,
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

const FILENAME = 'svg-gobbler'

const handle = {
  downloadOriginal(svgString: string, filename = FILENAME) {
    const blob = new Blob([svgString], { type: 'text/xml' })
    FileSaver.saveAs(blob, `${filename}.svg`)
  },

  downloadOptimized(svgString: string, filename = FILENAME) {
    const { data } = optimize(svgString, svgoConfig)
    const blob = new Blob([data], { type: 'text/xml' })
    FileSaver.saveAs(blob, `${filename}.svg`)
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

    zip
      .generateAsync({ type: 'blob' })
      .then((content) => {
        FileSaver.saveAs(content, 'gobbled-svgs.zip')
      })
      .catch((error) => {})
  },

  copyToClipboard(svgString: string) {
    navigator.clipboard.writeText(svgString)
  },

  copyOptimized(svgString: string) {
    const { data } = optimize(svgString, svgoConfig)
    handle.copyToClipboard(data)
  },

  exportPNG(
    imgSource: string,
    width: number,
    height: number,
    filename = FILENAME
  ) {
    const imageElement = new Image()

    imageElement.src = imgSource

    imageElement.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = width
      canvas.height = height

      ctx!.drawImage(imageElement, 0, 0)
      const dataUri = canvas.toDataURL('image/png', 0.9)

      FileSaver.saveAs(dataUri, `${filename}.png`)
    }
  },
}

export default handle
