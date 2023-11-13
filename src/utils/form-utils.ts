import JSZip from 'jszip'

/**
 * Utility class for form related operations like upload, download, and copy.
 */
export class FormUtils {
  /**
   * Process and returns the string SVG values associated with a
   * given file list.
   */
  static handleUpload(entryValues: File[]) {
    const promises = entryValues.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onload = (event) => {
          const result = event.target?.result
          if (typeof result === 'string') {
            resolve(result)
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
   * Copies a given png data url to the clipboard.
   */
  static async copyPngToClipboard(dataUrl: string) {
    try {
      const blob = await fetch(dataUrl).then((res) => res.blob())
      const item = new ClipboardItem({ [blob.type]: blob })
      await navigator.clipboard.write([item])
    } catch (error) {
      console.error('Failed to copy: ', error)
    }
  }

  /**
   * Downloads a given SVG string as a file.
   */
  static async downloadSvgString(file: string, baseFileName: string = 'svg-gobbler') {
    const svgBlob = new Blob([file], { type: 'text/xml' })
    const blobUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.download = `${baseFileName}.svg`
    downloadLink.href = blobUrl
    return downloadLink.click()
  }

  /**
   * Downloads a given array of SVG strings as a zip file.
   */
  static async downloadSvgStringsZip(files: string[], baseFileName: string) {
    const zip = new JSZip()

    files.forEach((file, index) => {
      zip.file(`${baseFileName}-${index}.svg`, file)
    })

    const zipContent = await zip.generateAsync({ type: 'blob' })
    const zipUrl = URL.createObjectURL(zipContent)
    const downloadLink = document.createElement('a')
    downloadLink.download = `${baseFileName}.zip`
    downloadLink.href = zipUrl
    return downloadLink.click()
  }

  /**
   * Downloads a given array of strings as a file or zip file depending on the number of strings.
   */
  static downloadSvgContent(svgStrings: string[], baseFileName: string) {
    if (svgStrings.length === 1) {
      return this.downloadSvgString(svgStrings[0], baseFileName)
    }

    return this.downloadSvgStringsZip(svgStrings, baseFileName)
  }

  /**
   * Creates a PNG data url from a given SVG string.
   */
  static svgToPngDataURL(svgString: string, width: number, height: number): Promise<string> {
    return new Promise((resolve, reject) => {
      // Create a Blob from the SVG string
      const svgBlob = new Blob(
        [
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path></svg>',
        ],
        { type: 'image/svg+xml' },
      )

      // Create a DOM URL for the Blob
      const url = URL.createObjectURL(svgBlob)

      // Create a temporary image to load the SVG
      const img = new Image()
      img.onload = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.style.backgroundColor = 'black'
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Canvas context is not available'))
          return
        }

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, width, height)

        // Convert the canvas to a PNG data URL
        const dataURL = canvas.toDataURL('image/png')

        // Clean up by revoking the Blob URL
        URL.revokeObjectURL(url)

        // Resolve the promise with the PNG data URL
        resolve(dataURL)
      }

      img.onerror = () => {
        reject(new Error('Error loading image'))
      }

      // Set the source of the image to the Blob URL
      img.src = url
    })
  }
}
