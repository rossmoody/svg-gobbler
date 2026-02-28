import type { DatabaseKey, PageData } from 'src/types'

import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import { pageData } from 'src/constants/page-data'

import { logger } from './logger'

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
   * Automatically decompresses data. Returns an empty PageData object if not found.
   * This is useful for ensuring that the app can handle missing data gracefully.
   */
  async getPageData(collectionId: string): Promise<PageData> {
    try {
      const pageData = await chrome.storage.local.get(collectionId)
      return this.decompressFromBase64(pageData[collectionId])
    } catch (error) {
      logger.error('Error getting page data from storage:', error)
      return pageData
    }
  },

  /**
   * Get various types of collection data from storage. Automatically decompresses data.
   */
  async getStorageData<T>(key: DatabaseKey): Promise<T | undefined> {
    try {
      const data = await chrome.storage.local.get(key)
      return this.decompressFromBase64(data[key])
    } catch {
      return
    }
  },

  /**
   * Returns current storage usage as bytes used, quota bytes, and a 0–1 percent.
   */
  async getStorageUsage(): Promise<{ bytesInUse: number; percent: number; quotaBytes: number }> {
    const bytesInUse = await chrome.storage.local.getBytesInUse()
    const quotaBytes = chrome.storage.local.QUOTA_BYTES
    return { bytesInUse, percent: bytesInUse / quotaBytes, quotaBytes }
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
