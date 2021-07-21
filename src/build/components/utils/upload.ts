import SVG from '../../../find/scripts/svg-class'
import {
  convertElementRefToSVGString,
  setWidthHeight,
  setViewBox,
  setSize,
  createPresentationSvg,
} from '../../../find/scripts/helpers'
import { AppData } from '../../types'

export const util = {
  isPlural(num: number): string {
    return num === 1 ? '' : 's'
  },

  getSvgQuantity(data: AppData) {
    const quantity = data instanceof Array && data.length
    return quantity ? quantity : 0
  },

  getSvgStrings(data: AppData) {
    const svgStrings =
      data instanceof Array && data.map((svg) => svg.svgString!)
    return svgStrings ? svgStrings : ['']
  },

  processUploadedSVG(svg: HTMLElement) {
    const localSvg = new SVG(svg)
    setViewBox.call(localSvg)
    setWidthHeight.call(localSvg)
    setSize.call(localSvg)
    convertElementRefToSVGString.call(localSvg)
    createPresentationSvg.call(localSvg)
    return localSvg
  },

  handleUploadClick() {
    const uploadInput = document.getElementById('upload')!
    uploadInput.click()
  },

  async handleUpload(event: any) {
    const promises: Promise<SVG>[] = []

    const files: Blob[] = Array.from(event.target.files)

    files.forEach((file) => {
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
