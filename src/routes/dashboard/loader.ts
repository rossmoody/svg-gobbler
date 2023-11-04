import type { Collection } from 'types'
/**
 * The primary initialization function for sidebar collections context.
 */
export async function dashboardLoader() {
  const { collections } = (await chrome.storage.local.get('collections')) as {
    collections: Collection[]
  }

  return collections
}
