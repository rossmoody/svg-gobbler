import { nanoid } from 'nanoid'
import type { Options } from 'pretty-bytes'
import prettyBytes from 'pretty-bytes'
import { StorageSvg } from 'src/types'

export class SvgUtils {
  /**
   * Return a pretty string of the bytes representing the size of the svg string.
   */
  static getPrettyBytes(svgString: string, options?: Options) {
    const bytes = new TextEncoder().encode(svgString).length
    return prettyBytes(bytes, options)
  }

  /**
   * Creates a storage svg object with an id and the svg string.
   */
  static createStorageSvg(svgString: string): StorageSvg {
    return {
      id: nanoid(),
      svg: svgString,
    }
  }
}
