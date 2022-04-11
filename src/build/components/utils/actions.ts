import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { extendDefaultPlugins, optimize } from 'svgo/dist/svgo.browser'
import { SVGImage } from './image-class'

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
    svgString: string,
    width: number,
    height: number,
    filename = FILENAME
  ) {
    const image = new SVGImage(svgString, height, width)
    image.svgElement.setAttribute('width', String(width))
    image.svgElement.setAttribute('height', String(height))
    const data = new XMLSerializer().serializeToString(image.svgElement)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const dom = window.URL || window.webkitURL || window

    const img = new Image(width, height)
    const svg = new Blob([data], { type: 'image/svg+xml' })
    const url = dom.createObjectURL(svg)

    img.onload = function () {
      ctx?.drawImage(img, 0, 0)
      dom.revokeObjectURL(url)
      const png_img = canvas.toDataURL('image/png')
      FileSaver.saveAs(png_img, `${filename}.png`)
    }

    img.src = url
  },
}

export default handle
