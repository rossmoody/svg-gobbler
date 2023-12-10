import type { Options } from 'pretty-bytes'
import type { StorageSvg } from 'src/types'
import type { Svg } from 'svg-gobbler-scripts'

import { nanoid } from 'nanoid'
import prettyBytes from 'pretty-bytes'

export class SvgUtils {
  /**
   * Creates a storage svg object with an id and the svg string.
   */
  static createStorageSvg(svgString: string): StorageSvg {
    return {
      id: nanoid(),
      svg: svgString,
    }
  }

  /**
   *
   */
  static createStorageSvgs(svgArray: Svg[]): StorageSvg[] {
    return svgArray.map((svg) => ({
      id: svg.id,
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
}
