import { StorageUtilities } from 'src/utils/storage-utilities'

/**
 * The primary initialization function for sidebar collections context.
 */
export async function dashboardLoader() {
  return await StorageUtilities.getStorageData('collections')
}
