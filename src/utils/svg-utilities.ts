import type { Options } from 'pretty-bytes'
import type { StorageSvg, Svg } from 'src/scripts'

import { nanoid } from 'nanoid'
import prettyBytes from 'pretty-bytes'
import { FileSvg } from 'src/types'

export const SvgUtilities = {
  /**
   * Creates a storage svg object with an id and the svg string.
   */
  createStorageSvg(fileSvg: FileSvg): StorageSvg {
    return {
      corsRestricted: false,
      id: nanoid(),
      lastEdited: new Date().toISOString(),
      name: fileSvg.name,
      svg: fileSvg.svg,
    }
  },

  /**
   * Creates an array of storage svg objects with an id and the svg string.
   */
  createStorageSvgs(svgArray: Svg[]): StorageSvg[] {
    return svgArray.map((svg) => ({
      corsRestricted: svg.corsRestricted,
      id: svg.id,
      lastEdited: svg.lastEdited,
      name: svg.name,
      svg: svg.svg,
    }))
  },

  /**
   * Return a pretty string of the bytes representing the size of the svg string.
   */
  getPrettyBytes(svgString: string, options?: Options) {
    const bytes = new TextEncoder().encode(svgString).length
    return prettyBytes(bytes, options)
  },

  /**
   * Check if a given string is a valid svg.
   */
  isValidSvg(text: string) {
    try {
      const parser = new DOMParser()
      const document_ = parser.parseFromString(text, 'image/svg+xml')
      return !!document_.querySelector('svg')
    } catch {
      return false
    }
  },
}
