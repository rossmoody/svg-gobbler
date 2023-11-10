import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import { Collection } from 'src/types'

/**
 *
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
  static async getPageData<T>(collectionId: string): Promise<T> {
    const pageData = await chrome.storage.local.get(collectionId)
    return this.decompressFromBase64(pageData[collectionId])
  }

  /**
   * Set page data in storage based on collectionId.
   * Automatically compresses data.
   */
  static async setPageData(collectionId: string, data: unknown): Promise<void> {
    await chrome.storage.local.set({
      [collectionId]: this.compressToBase64(data),
    })
  }

  /**
   * Set collections data in storage.
   * Automatically compresses data.
   */
  static async setCollectionsData(data: Collection[]): Promise<void> {
    await chrome.storage.local.set({
      collections: this.compressToBase64(data),
    })
  }

  /**
   * Get collections data from storage.
   * Automatically decompresses data.
   */
  static async getCollectionsData(): Promise<Collection[]> {
    const collectionsData = await chrome.storage.local.get('collections')
    return this.decompressFromBase64(collectionsData.collections)
  }
}
