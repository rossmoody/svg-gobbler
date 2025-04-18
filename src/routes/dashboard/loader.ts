import { StorageUtilities } from 'src/utilities/storage-utilities'

/**
 * The primary initialization function for sidebar collections context.
 */
export async function dashboardLoader() {
  return await StorageUtilities.getStorageData('collections')
}
