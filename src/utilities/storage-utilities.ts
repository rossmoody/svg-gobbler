import type { DatabaseKey, PageData } from 'src/types'

import { compressToUTF16, decompressFromUTF16 } from 'lz-string'

/**
 * A helper for working with Chrome storage and automating compression.
 */
export const StorageUtilities = {
  /**
   * Stringify and compress a string to base64.
   */
  compressToBase64(input: unknown): string {
    return compressToUTF16(JSON.stringify(input))
  },

  /**
   * Decompress and parse a string from base64.
   */
  decompressFromBase64<T>(input: string): T {
    return JSON.parse(decompressFromUTF16(input))
  },

  /**
   * Get page data from storage based on collectionId.
   * Automatically decompresses data.
   */
  async getPageData(collectionId: string): Promise<PageData> {
    try {
      const pageData = await chrome.storage.local.get(collectionId)
      return this.decompressFromBase64(pageData[collectionId])
    } catch {
      return {} as PageData
    }
  },

  /**
   * Get various types of collection data from storage. Automatically decompresses data.
   */
  async getStorageData<T>(key: DatabaseKey): Promise<T> {
    try {
      const data = await chrome.storage.local.get(key)
      return this.decompressFromBase64(data[key])
    } catch {
      throw new Error(`Failed to get data for key: ${key}`)
    }
  },

  /**
   * Set page data in storage based on collectionId.
   * Automatically compresses data.
   */
  async setPageData(collectionId: string, data: PageData): Promise<void> {
    await chrome.storage.local.set({
      [collectionId]: this.compressToBase64(data),
    })
  },

  /**
   * Sets data in storage based on key. Automatically compresses data.
   */
  async setStorageData(key: DatabaseKey, data: unknown): Promise<void> {
    await chrome.storage.local.set({
      [key]: this.compressToBase64(data),
    })
  },
}
