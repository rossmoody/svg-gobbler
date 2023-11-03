import { compressToUTF16, decompressFromUTF16 } from 'lz-string'

class LzString {
  /**
   * Stringify and compress a string to base64.
   */
  compressToBase64(input: unknown): string {
    return compressToUTF16(JSON.stringify(input))
  }

  /**
   * Decompress and parse a string from base64.
   */
  decompressFromBase64<T>(input: string): T {
    return JSON.parse(decompressFromUTF16(input))
  }
}

export default new LzString()
