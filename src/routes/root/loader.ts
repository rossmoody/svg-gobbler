import { nanoid } from 'nanoid'
import { redirect } from 'react-router-dom'
import type { BackgroundMessage, Collection } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'

/**
 * The primary initialization function for the root route.
 * Adds the initial collection to storage and redirects to the collection created.
 *
 * The only time we see this is on refresh or when the extension is invoked from the browser action.
 */
export async function rootLoader() {
  const collection: Collection = {
    id: nanoid(),
    name: 'Collection',
    origin: '',
  }

  // Get all collections from storage for sidenav
  const prevCollections = await StorageUtils.getCollectionsData()

  try {
    const response = (await chrome.runtime.sendMessage('gobble')) as BackgroundMessage
    // If message connection is successful, process the response, add the collection to storage
    collection.name = response.data.host
    collection.origin = response.data.origin
    await StorageUtils.setPageData(collection.id, response.data)
    await StorageUtils.setCollectionsData([collection, ...prevCollections])
  } catch (error) {
    // The listener has been removed, so the background script is no longer listening
    // This fires when the extension is reloaded as we're managing all routes in memory
    return redirect(`/dashboard/collection/${prevCollections[0].id}`)
  }

  // Return to the path to the newly created collection
  return redirect(`/dashboard/collection/${collection.id}`)
}
