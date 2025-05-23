import JSZip from 'jszip'
import { ExportSvg } from 'src/hooks/use-export-actions'
import { ExportState, FileType } from 'src/providers'
import { type FileSvg } from 'src/types'

import { buildSpriteAndDemo } from './sprite-builder'

/**
 * Utility class for form related operations like upload, download, and copy.
 */
export const formUtilities = {
  /**
   * Creates a data url from a given SVG string.
   */
  convertToDataUrl(
    svgString: string,
    size: number,
    type: 'image/jpeg' | 'image/png' | 'image/webp',
    quality?: number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const sanitizedSvg = this.prepareSvgForImages(svgString, size)
      const svgBlob = new Blob([sanitizedSvg], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)

      const img = new Image()
      img.addEventListener('load', () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const context = canvas.getContext('2d')
        if (!context) {
          reject(new Error('Canvas context is not available'))
          return
        }

        // Fill background with white for JPEGs
        if (type === 'image/jpeg') {
          context.fillStyle = '#FFF'
          context.fillRect(0, 0, img.width, img.height)
        }

        context.drawImage(img, 0, 0, img.width, img.height)

        const dataURL = canvas.toDataURL(type, quality)
        URL.revokeObjectURL(url)
        resolve(dataURL)
      })

      img.addEventListener('error', () => {
        reject(new Error('Error loading image'))
      })

      img.src = url
    })
  },

  /**
   * Copies a given png data url to the clipboard.
   */
  async copyImageToClipboard(dataUrl: string) {
    try {
      const blob = await fetch(dataUrl).then((response) => response.blob())
      const item = new ClipboardItem({ [blob.type]: blob })
      await navigator.clipboard.write([item])
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  },

  /**
   * Copies a given text to the clipboard.
   */
  async copyStringToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  },

  /**
   * Downloads a given array of data urls as a zip file.
   */
  async downloadDataUrlsZip(exportSvgs: ExportSvg[], exportState: ExportState) {
    const zip = new JSZip()

    for (const [index, file] of exportSvgs.entries()) {
      let filename = `${file.name}.${exportState.fileType}`
      const base64Data = file.payload.split(',')[1]

      if (exportState.prefixFilenames) {
        filename = `${exportState.filenamePrefix}_${index}.${exportState.fileType}`
      }

      zip.file(filename, base64Data, { base64: true })
    }

    const zipContent = await zip.generateAsync({ type: 'blob' })
    this.downloadZipFile(zipContent, `${exportState.filename}.zip`)
  },

  /**
   * Downloads a given array of data urls as a file or zip file depending on the number of urls.
   */
  async downloadImageContent(exportSvgs: ExportSvg[], exportState: ExportState) {
    if (exportSvgs.length === 1) {
      await this.downloadImageDataUrl(
        exportSvgs[0].payload,
        exportState.filename,
        exportState.fileType,
      )
      return
    }

    await this.downloadDataUrlsZip(exportSvgs, exportState)
  },

  /**
   * Downloads a given data url as a file.
   */
  async downloadImageDataUrl(dataUrl: string, baseFileName: string, type: FileType) {
    const blob = await fetch(dataUrl).then((response) => response.blob())
    const blobUrl = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.download = `${baseFileName}.${type}`
    downloadLink.href = blobUrl
    downloadLink.click()
  },

  async downloadSpriteZip(exportSvgs: ExportSvg[], exportState: ExportState) {
    const zip = new JSZip()

    const { demoHtml, sprite } = buildSpriteAndDemo(exportSvgs, exportState)

    zip.file('sprite.svg', sprite.outerHTML)
    zip.file('demo.html', demoHtml)

    const zipContent = await zip.generateAsync({ type: 'blob' })
    this.downloadZipFile(zipContent, `${exportState.filename}.zip`)
  },

  /**
   * Downloads a given array of strings as a file or zip file depending on the number of strings.
   */
  async downloadSvgContent(exportSvgs: ExportSvg[], exportState: ExportState) {
    if (exportSvgs.length === 1) {
      await this.downloadSvgString(exportSvgs[0].payload, exportState.filename)
      return
    }

    await this.downloadSvgStringsZip(exportSvgs, exportState)
  },

  /**
   * Downloads a given SVG string as a file.
   */
  async downloadSvgString(file: string, baseFileName: string) {
    const svgBlob = new Blob([file], { type: 'text/xml' })
    const blobUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.download = `${baseFileName}.svg`
    downloadLink.href = blobUrl
    downloadLink.click()
  },

  /**
   * Downloads a given array of SVG strings as a zip file.
   */
  async downloadSvgStringsZip(exportSvgs: ExportSvg[], exportState: ExportState) {
    const zip = new JSZip()

    for (const [index, file] of exportSvgs.entries()) {
      let filename = `${file.name}.svg`

      if (exportState.prefixFilenames) {
        filename = `${exportState.filenamePrefix}_${index}.svg`
      }

      zip.file(filename, file.payload)
    }

    const zipContent = await zip.generateAsync({ type: 'blob' })
    this.downloadZipFile(zipContent, `${exportState.filename}.zip`)
  },

  /**
   * Downloads a given zip file
   */
  downloadZipFile(zip: Blob, filename: string) {
    const zipUrl = URL.createObjectURL(zip)
    const downloadLink = document.createElement('a')
    downloadLink.download = filename
    downloadLink.href = zipUrl
    downloadLink.click()
  },

  /**
   * Process and returns the string SVG values associated with a
   * given file list.
   */
  handleUpload(entryValues: File[]): Promise<FileSvg[]> {
    const promises = entryValues.map((file) => {
      const fileName = file.name.trim().replace(/\.svg$/i, '')

      return file
        .text()
        .then((result) => {
          return { name: fileName, svg: result } as FileSvg
        })
        .catch(() => {
          throw new Error('Error reading file')
        })
    })

    return Promise.all(promises)
  },

  /**
   * Checks if a given string is a valid SVG.
   */
  isValidSVG(svgString: string) {
    const parser = new DOMParser()
    const document_ = parser.parseFromString(svgString, 'image/svg+xml')

    // Checks if any parsing error node exists
    const parserErrorNS = parser
      .parseFromString('INVALID', 'text/xml')
      .querySelectorAll('parsererror')[0].namespaceURI
    const errorNode = document_.getElementsByTagNameNS(parserErrorNS, 'parsererror')

    // If there's a parser error, the SVG is invalid
    if (errorNode.length > 0) {
      return false
    }

    // Additionally check if the root element is an SVG element
    return document_.documentElement.nodeName === 'svg'
  },

  /**
   * Builds a valid SVG element from a given string.
   *
   * This is used to strip the SVG of competing styles related to class, explicit height,
   * or explicit width attributes to allow the SVG to scale responsively in PNG creations.
   * Attempts to add a viewBox attribute if one is not present based on width or height.
   */
  prepareSvgForImages(svgString: string, size: number): string {
    const parser = new DOMParser()
    const { documentElement: svg } = parser.parseFromString(svgString, 'image/svg+xml')

    if (svg.querySelector('parsererror')) {
      throw new Error('Invalid SVG string')
    }

    if (!svg.getAttribute('xmlns')) {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    }

    // Remove all style attributes & ensure xmlns for Firefox
    svg.removeAttribute('style')
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg')

    const viewBox =
      svg.getAttribute('viewBox') ||
      `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`
    let width = Number.parseInt(viewBox.split(' ')[2])
    let height = Number.parseInt(viewBox.split(' ')[3])

    const aspectRatio = width / height

    if (width > height) {
      width = size
      height = size / aspectRatio
    } else {
      height = size
      width = size * aspectRatio
    }

    svg.setAttribute('viewBox', viewBox)
    svg.setAttribute('width', `${width}`)
    svg.setAttribute('height', `${height}`)

    return svg.outerHTML
  },
}
