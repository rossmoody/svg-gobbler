import JSZip from 'jszip'
import { ExportSvg } from 'src/layout/collection/main-panel/use-export-actions'
import { ExportState, FileType } from 'src/providers'
import { type FileSvg } from 'src/types'

import { buildSpriteAndDemo } from './sprite-builder'

/**
 * Utility class for form related operations like upload, download, and copy.
 */
export class FormUtils {
  /**
   * Builds a valid SVG element from a given string.
   *
   * This is used to strip the SVG of competing styles related to class, explicit height,
   * or explicit width attributes to allow the SVG to scale responsively in PNG creations.
   * Attempts to add a viewBox attribute if one is not present based on width or height.
   */
  static buildSvgElementFromString(svgString: string): string {
    const parser = new DOMParser()
    const { documentElement: svg } = parser.parseFromString(svgString, 'image/svg+xml')

    if (svg.querySelector('parsererror')) {
      throw new Error('Invalid SVG string')
    }

    if (!svg.getAttribute('xmlns')) {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    }

    const width = svg.getAttribute('width')
    const height = svg.getAttribute('height')
    const viewBox = svg.getAttribute('viewBox')

    svg.removeAttribute('height')
    svg.removeAttribute('width')
    svg.removeAttribute('style')

    if (!viewBox && width && height) {
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }

    return svg.outerHTML
  }

  /**
   * Creates a data url from a given SVG string.
   */
  static convertToDataUrl(
    svgString: string,
    size: number,
    type: 'image/jpeg' | 'image/png' | 'image/webp',
    quality?: number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const sanitizedSvg = this.buildSvgElementFromString(svgString)
      const svgBlob = new Blob([sanitizedSvg], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)

      const img = new Image()
      img.onload = () => {
        let width, height
        const aspectRatio = img.width / img.height

        if (img.width > img.height) {
          width = size
          height = size / aspectRatio
        } else {
          height = size
          width = size * aspectRatio
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas context is not available'))
          return
        }

        // Fill background with white for JPEGs
        if (type === 'image/jpeg') {
          ctx.fillStyle = '#FFF'
          ctx.fillRect(0, 0, width, height)
        }

        ctx.drawImage(img, 0, 0, width, height)

        const dataURL = canvas.toDataURL(type, quality)
        URL.revokeObjectURL(url)
        resolve(dataURL)
      }

      img.onerror = () => {
        reject(new Error('Error loading image'))
      }

      img.src = url
    })
  }

  /**
   * Copies a given png data url to the clipboard.
   */
  static async copyImageToClipboard(dataUrl: string) {
    try {
      const blob = await fetch(dataUrl).then((res) => res.blob())
      const item = new ClipboardItem({ [blob.type]: blob })
      await navigator.clipboard.write([item])
    } catch (error) {
      console.error('Failed to copy: ', error)
    }
  }

  /**
   * Copies a given text to the clipboard.
   */
  static async copyStringToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  /**
   * Downloads a given array of data urls as a zip file.
   */
  static async downloadDataUrlsZip(exportSvgs: ExportSvg[], exportState: ExportState) {
    const zip = new JSZip()

    exportSvgs.forEach((file, index) => {
      let filename = `${file.name}.${exportState.fileType}`
      const base64Data = file.payload.split(',')[1]

      if (exportState.prefixFilenames) {
        filename = `${exportState.filenamePrefix}_${index}.${exportState.fileType}`
      }

      zip.file(filename, base64Data, { base64: true })
    })

    const zipContent = await zip.generateAsync({ type: 'blob' })
    this.downloadZipFile(zipContent, `${exportState.filename}.zip`)
  }

  /**
   * Downloads a given array of data urls as a file or zip file depending on the number of urls.
   */
  static downloadImageContent(exportSvgs: ExportSvg[], exportState: ExportState) {
    if (exportSvgs.length === 1) {
      this.downloadImageDataUrl(exportSvgs[0].payload, exportState.filename, exportState.fileType)
      return
    }

    this.downloadDataUrlsZip(exportSvgs, exportState)
  }

  /**
   * Downloads a given data url as a file.
   */
  static async downloadImageDataUrl(dataUrl: string, baseFileName: string, type: FileType) {
    const blob = await fetch(dataUrl).then((res) => res.blob())
    const blobUrl = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.download = `${baseFileName}.${type}`
    downloadLink.href = blobUrl
    downloadLink.click()
  }

  static async downloadSpriteZip(exportSvgs: ExportSvg[], exportState: ExportState) {
    const zip = new JSZip()

    const { demoHtml, sprite } = buildSpriteAndDemo(exportSvgs, exportState)

    zip.file('sprite.svg', sprite.outerHTML)
    zip.file('demo.html', demoHtml)

    const zipContent = await zip.generateAsync({ type: 'blob' })
    this.downloadZipFile(zipContent, `${exportState.filename}.zip`)
  }

  /**
   * Downloads a given array of strings as a file or zip file depending on the number of strings.
   */
  static downloadSvgContent(exportSvgs: ExportSvg[], exportState: ExportState) {
    if (exportSvgs.length === 1) {
      this.downloadSvgString(exportSvgs[0].payload, exportState.filename)
      return
    }

    this.downloadSvgStringsZip(exportSvgs, exportState)
  }

  /**
   * Downloads a given SVG string as a file.
   */
  static async downloadSvgString(file: string, baseFileName: string) {
    const svgBlob = new Blob([file], { type: 'text/xml' })
    const blobUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.download = `${baseFileName}.svg`
    downloadLink.href = blobUrl
    downloadLink.click()
  }

  /**
   * Downloads a given array of SVG strings as a zip file.
   */
  static async downloadSvgStringsZip(exportSvgs: ExportSvg[], exportState: ExportState) {
    const zip = new JSZip()

    exportSvgs.forEach((file, index) => {
      let filename = `${file.name}.svg`

      if (exportState.prefixFilenames) {
        filename = `${exportState.filenamePrefix}_${index}.svg`
      }

      zip.file(filename, file.payload)
    })

    const zipContent = await zip.generateAsync({ type: 'blob' })
    this.downloadZipFile(zipContent, `${exportState.filename}.zip`)
  }

  /**
   * Downloads a given zip file
   */
  static downloadZipFile(zip: Blob, filename: string) {
    const zipUrl = URL.createObjectURL(zip)
    const downloadLink = document.createElement('a')
    downloadLink.download = filename
    downloadLink.href = zipUrl
    downloadLink.click()
  }

  /**
   * Process and returns the string SVG values associated with a
   * given file list.
   */
  static handleUpload(entryValues: File[]): Promise<FileSvg[]> {
    const promises = entryValues.map((file) => {
      const fileName = file.name.trim().replace(/\.svg$/i, '')

      return new Promise<FileSvg>((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onload = (event) => {
          const result = event.target?.result
          if (typeof result === 'string') {
            resolve({ name: fileName, svg: result } as FileSvg)
          } else {
            reject(new Error('File read result is not a string'))
          }
        }

        fileReader.onerror = () => {
          reject(new Error('Error reading file'))
        }

        fileReader.readAsText(file)
      })
    })

    return Promise.all(promises)
  }

  /**
   * Checks if a given string is a valid SVG.
   */
  static isValidSVG(svgString: string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')

    // Checks if any parsing error node exists
    const parserErrorNS = parser
      .parseFromString('INVALID', 'text/xml')
      .getElementsByTagName('parsererror')[0].namespaceURI
    const errorNode = doc.getElementsByTagNameNS(parserErrorNS, 'parsererror')

    // If there's a parser error, the SVG is invalid
    if (errorNode.length > 0) {
      return false
    }

    // Additionally check if the root element is an SVG element
    return doc.documentElement.nodeName === 'svg'
  }
}
