import type { StorageSvg, Svg } from 'src/scripts'
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
 * Pending updates per collection, so each one reads what the previous one wrote.
 */
const updateQueues = new Map<string, Promise<boolean>>()

/**
 * Ids this page has written per collection. For these, storage is the source
 * of truth; anything else on screen is still only the loader's processed copy.
 */
const writtenIds = new Map<string, Set<string>>()

const toStorageSvg = (svg: Svg): StorageSvg => ({
  corsRestricted: svg.corsRestricted,
  id: svg.id,
  lastEdited: svg.lastEdited,
  name: svg.name,
  svg: svg.svg,
})

/**
 * Bring stored data up to date with what the collection loader produced, without
 * undoing earlier updates. Loading fetches image content and extracts symbols
 * and groups under new ids, and none of that is stored until the first write.
 *
 * - Stored item this page hasn't written yet: use its loaded (processed) form.
 * - Loaded item missing from storage and never written: it was extracted while
 *   loading, so add it after the item it came from.
 * - Loaded item missing from storage but written before: an earlier update
 *   removed it, so it stays removed.
 * - Stored item missing from the loaded data: kept as is.
 */
export function reconcileLoadedData(
  stored: StorageSvg[],
  loaded: Svg[],
  written: ReadonlySet<string> = new Set(),
): StorageSvg[] {
  const storedIds = new Set(stored.map((item) => item.id))
  const loadedById = new Map(loaded.map((svg) => [svg.id, svg]))
  const extracted = new Map<string, StorageSvg[]>()

  // Extracted items found before any stored item are filed under this key.
  let anchor = ''
  for (const svg of loaded) {
    if (storedIds.has(svg.id)) {
      anchor = svg.id
    } else if (!written.has(svg.id)) {
      extracted.set(anchor, [...(extracted.get(anchor) ?? []), toStorageSvg(svg)])
    }
  }

  const result = [...(extracted.get('') ?? [])]
  for (const item of stored) {
    const fresh = loadedById.get(item.id)
    result.push(
      fresh && !written.has(item.id) ? toStorageSvg(fresh) : item,
      ...(extracted.get(item.id) ?? []),
    )
  }
  return result
}

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
   */
  async getStorageUsage(): Promise<{ bytesInUse: number; percent: number; quotaBytes: number }> {
    try {
      const bytesInUse = await chrome.storage.local.getBytesInUse()
      const quotaBytes = chrome.storage.local.QUOTA_BYTES
      if (!quotaBytes) return { bytesInUse, percent: 0, quotaBytes: 0 }
      return { bytesInUse, percent: bytesInUse / quotaBytes, quotaBytes }
    } catch {
      return { bytesInUse: 0, percent: 0, quotaBytes: 0 }
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
   * Change a collection's page data based on what is in storage right now.
   * Updates to the same collection run one at a time, each reading the result
   * of the one before, and the promise resolves once the write has landed, so
   * two quick edits can't overwrite each other.
   *
   * Describe the change against `current` (add, remove or replace items by id)
   * rather than writing back a copy of the data held in UI state, which may
   * already be out of date. Pass the collection's loaded data as `loaded` so
   * `current` includes what the loader fetched or extracted.
   */
  async updatePageData(
    collectionId: string,
    update: (current: PageData) => PageData,
    loaded?: Svg[],
  ): Promise<boolean> {
    const run = async () => {
      const stored = await this.getPageData(collectionId)
      const written = writtenIds.get(collectionId) ?? new Set<string>()
      const current = loaded
        ? { ...stored, data: reconcileLoadedData(stored.data, loaded, written) }
        : stored
      const next = update(current)
      const saved = await this.write(collectionId, next)
      if (saved) {
        // Include what the update removed, so stale UI state can't bring it back.
        for (const item of [...current.data, ...next.data]) written.add(item.id)
        writtenIds.set(collectionId, written)
      }
      return saved
    }

    const queued = (updateQueues.get(collectionId) ?? Promise.resolve(true)).then(run, run)
    updateQueues.set(collectionId, queued)
    try {
      return await queued
    } finally {
      if (updateQueues.get(collectionId) === queued) updateQueues.delete(collectionId)
    }
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
