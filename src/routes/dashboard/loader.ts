import { StorageUtils } from 'src/utils/storage-utils'

/**
 * The primary initialization function for sidebar collections context.
 */
export async function dashboardLoader() {
  return await StorageUtils.getCollectionsData()
}
