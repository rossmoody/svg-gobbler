import type { DatabaseKey, PageData } from 'src/types'

import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import { pageData } from 'src/constants/page-data'

import { logger } from './logger'

/**
 * Fired on the global scope whenever a write to storage fails, so the UI can
 * tell the user their change was not saved.
 */
export const STORAGE_WRITE_ERROR_EVENT = 'svg-gobbler:storage-write-error'

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
   * Firefox doesn't define QUOTA_BYTES on storage.local (and only implemented
   * getBytesInUse in v144), so both are guarded to avoid a NaN percent.
   *
   * QUOTA_BYTES is a constant that ignores the unlimitedStorage permission, so
   * when the permission is granted the quota is reported as 0 (no quota).
   */
  async getStorageUsage(): Promise<{ bytesInUse: number; percent: number; quotaBytes: number }> {
    try {
      const bytesInUse = await chrome.storage.local.getBytesInUse()
      const quotaBytes = this.hasUnlimitedStorage() ? 0 : chrome.storage.local.QUOTA_BYTES
      if (!quotaBytes) return { bytesInUse, percent: 0, quotaBytes: 0 }
      return { bytesInUse, percent: bytesInUse / quotaBytes, quotaBytes }
    } catch {
      return { bytesInUse: 0, percent: 0, quotaBytes: 0 }
    }
  },

  /**
   * True when the manifest grants unlimitedStorage, which lifts the
   * storage.local quota.
   */
  hasUnlimitedStorage(): boolean {
    try {
      return chrome.runtime.getManifest().permissions?.includes('unlimitedStorage') ?? false
    } catch {
      return false
    }
  },

  /**
   * Set page data in storage based on collectionId. Automatically compresses data.
   * Resolves to false (and notifies the UI) if the write fails.
   */
  async setPageData(collectionId: string, data: PageData): Promise<boolean> {
    return this.write(collectionId, data)
  },

  /**
   * Sets data in storage based on key. Automatically compresses data.
   * Resolves to false (and notifies the UI) if the write fails.
   */
  async setStorageData(key: DatabaseKey, data: unknown): Promise<boolean> {
    return this.write(key, data)
  },

  /**
   * Compress and write a value to storage. Never rejects: most callers don't
   * await writes, so a failure (e.g. quota exceeded) is logged and broadcast
   * as STORAGE_WRITE_ERROR_EVENT instead of becoming an unhandled rejection.
   */
  async write(key: string, data: unknown): Promise<boolean> {
    try {
      await chrome.storage.local.set({ [key]: this.compressToBase64(data) })
      return true
    } catch (error) {
      logger.error(`Error writing "${key}" to storage:`, error)
      globalThis.dispatchEvent(new CustomEvent(STORAGE_WRITE_ERROR_EVENT, { detail: { key } }))
      return false
    }
  },
}
