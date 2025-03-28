import type { Options } from 'pretty-bytes'
import type { StorageSvg, Svg } from 'src/scripts'

import { nanoid } from 'nanoid'
import prettyBytes from 'pretty-bytes'
import { FileSvg } from 'src/types'

export class SvgUtils {
  /**
   * Creates a storage svg object with an id and the svg string.
   */
  static createStorageSvg(fileSvg: FileSvg): StorageSvg {
    return {
      id: nanoid(),
      lastEdited: new Date().toISOString(),
      name: fileSvg.name,
      svg: fileSvg.svg,
    }
  }

  /**
   * Creates an array of storage svg objects with an id and the svg string.
   */
  static createStorageSvgs(svgArray: Svg[]): StorageSvg[] {
    return svgArray.map((svg) => ({
      id: svg.id,
      lastEdited: svg.lastEdited,
      name: svg.name,
      svg: svg.originalString,
    }))
  }

  /**
   * Return a pretty string of the bytes representing the size of the svg string.
   */
  static getPrettyBytes(svgString: string, options?: Options) {
    const bytes = new TextEncoder().encode(svgString).length
    return prettyBytes(bytes, options)
  }

  /**
   * Check if a given string is a valid svg.
   */
  static isValidSvg(text: string) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'image/svg+xml')
      return !!doc.querySelector('svg')
    } catch (error) {
      return false
    }
  }

  /**
   * Rename a set of storage svgs in sequential order based on a prefixed name.
   */
  static renameStorageSvgs(storageSvgs: StorageSvg[], name: string) {
    return storageSvgs.map((svg, index) => ({
      ...svg,
      name: `${name}-${index + 1}`,
    }))
  }
}
