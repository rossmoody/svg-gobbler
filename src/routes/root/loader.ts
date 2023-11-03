import { nanoid } from 'nanoid'
import { redirect } from 'react-router-dom'
import lzString from 'src/utils/lz-string'
import { BackgroundMessage, Collection } from 'types'

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
  }

  // Get all collections from storage for sidenav
  let { collections: prevCollections } = (await chrome.storage.local.get('collections')) as {
    collections: Collection[]
  }

  if (!prevCollections) {
    prevCollections = []
  }

  try {
    const response = (await chrome.runtime.sendMessage('gobble')) as BackgroundMessage
    // If message connection is successful, process the response, add the collection to storage
    collection.name = response.data.host
    const compressed = lzString.compressToBase64(response.data)
    chrome.storage.local.set({ collections: [collection, ...prevCollections] })
    chrome.storage.local.set({ [collection.id]: compressed })
  } catch (error) {
    // The listener has been removed, so the background script is no longer listening
    // This fires when the extension is reloaded as we're managing all routes in memory
    return redirect(`/dashboard/collection/${prevCollections[0].id}`)
  }

  // Return to the path to the newly created collection
  return redirect(`/dashboard/collection/${collection.id}`)
}
