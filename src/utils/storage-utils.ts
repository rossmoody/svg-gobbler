import type { PageData } from 'src/types'

import { compressToUTF16, decompressFromUTF16 } from 'lz-string'

/**
 * A helper for working with Chrome storage and automating compression.
 */
export class StorageUtils {
  /**
   * Stringify and compress a string to base64.
   */
  static compressToBase64(input: unknown): string {
    return compressToUTF16(JSON.stringify(input))
  }

  /**
   * Decompress and parse a string from base64.
   */
  static decompressFromBase64<T>(input: string): T {
    return JSON.parse(decompressFromUTF16(input))
  }

  /**
   * Get page data from storage based on collectionId.
   * Automatically decompresses data.
   */
  static async getPageData(collectionId: string): Promise<PageData> {
    try {
      const pageData = await chrome.storage.local.get(collectionId)
      return this.decompressFromBase64(pageData[collectionId])
    } catch (error) {
      return {} as PageData
    }
  }

  /**
   * Get collections data from storage. Automatically decompresses data.
   */
  static async getStorageData<T>(key: 'collections' | 'plugins' | 'view'): Promise<T | undefined> {
    try {
      const data = await chrome.storage.local.get(key)
      return this.decompressFromBase64(data[key])
    } catch (error) {
      return
    }
  }

  /**
   * Set page data in storage based on collectionId.
   * Automatically compresses data.
   */
  static async setPageData(collectionId: string, data: PageData): Promise<void> {
    await chrome.storage.local.set({
      [collectionId]: this.compressToBase64(data),
    })
  }

  /**
   * Sets data in storage based on key.
   * Automatically compresses data.
   */
  static async setStorageData(key: string, data: unknown): Promise<void> {
    await chrome.storage.local.set({
      [key]: this.compressToBase64(data),
    })
  }
}
