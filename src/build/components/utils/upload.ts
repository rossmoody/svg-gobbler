import SVG from '../../../find/scripts/svg-class'
import process from '../../../find/scripts/process-svg'
import { AppData } from '../../types'

export const util = {
  isPlural(num: number): string {
    return num === 1 ? '' : 's'
  },

  getSvgQuantity(data: AppData) {
    const isArray = data instanceof Array

    if (isArray) {
      const array = data as SVG[][]
      const quantity = array.reduce(
        (finalLength: number, currentArray: SVG[]) => {
          const length = currentArray.length
          const newLength = finalLength + length
          return newLength
        },
        0
      )

      return quantity
    }

    return 0
  },

  getSvgStrings(data: AppData) {
    const svgStrings =
      data instanceof Array &&
      data.flatMap((svgArray) => svgArray.map((svg) => svg.svgString!))
    return svgStrings ? svgStrings : ['']
  },

  processUploadedSVG(svg: HTMLElement) {
    const localSvg = new SVG(svg)
    process.setViewBox.call(localSvg)
    process.setWidthHeight.call(localSvg)
    process.setSize.call(localSvg)
    process.convertElementRefToSVGString.call(localSvg)
    process.createPresentationSvg.call(localSvg)
    localSvg.type = 'inline'
    return localSvg
  },

  handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const dropzone = document.getElementById('dropzone')!
    if (dropzone) {
      dropzone.style.background = 'rgba(255, 255, 255, 0.4)'
    }
  },

  handleDragOut(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const dropzone = document.getElementById('dropzone')!
    if (dropzone) dropzone.style.background = ''
  },

  handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    this.handleDragOut(event)
    return this.handleUpload(event)
  },

  handleUploadClick() {
    const uploadInput = document.getElementById('upload')!
    uploadInput.click()
  },

  handlePaste(svgString: string) {
    const iDoc = new DOMParser().parseFromString(svgString, 'image/svg+xml')

    const error = iDoc.querySelector('parsererror')
    if (error) return false

    const svgElement = iDoc.documentElement
    const processedSvg = this.processUploadedSVG(svgElement)
    return processedSvg
  },

  async handleUpload(event: any) {
    const isDropEvent = event.type === 'drop'

    const files: Blob[] = isDropEvent
      ? Array.from(event.dataTransfer.files)
      : Array.from(event.target.files)

    const promises: Promise<SVG>[] = []

    files.forEach((file) => {
      const isSVGFileType = file.type === 'image/svg+xml'
      if (!isSVGFileType) return

      const filePromise: Promise<SVG> = new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const svgString = reader.result
          if (typeof svgString === 'string') {
            const iDoc = new DOMParser().parseFromString(
              svgString,
              'image/svg+xml'
            )
            const svgElement = iDoc.documentElement
            const processedSvg = this.processUploadedSVG(svgElement)
            resolve(processedSvg)
          }
        }
      })

      promises.push(filePromise)
    })

    const finals = await Promise.all(promises)

    return finals
  },
}
