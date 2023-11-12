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
  static async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
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
}
