import { nanoid } from 'nanoid'
import { defer } from 'react-router-dom'
import svgFactory from 'scripts/svg-factory'
import { SvgoPlugin, defaultSvgoPlugins } from 'src/constants/svgo-plugins'
import { BackgroundMessage, Collection, PageData } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'

/**
 * The primary initialization function for the root route.
 * Adds the initial collection to storage and redirects to the collection created.
 *
 * The only time we see this is on refresh or when the extension is invoked from the browser action.
 */
export async function rootLoader() {
  return defer({
    collectionId: (async () => {
      const collection: Collection = {
        id: nanoid(),
        name: 'Collection',
        origin: '',
      }

      // Get all collections from storage for sidenav
      const prevCollections = (await StorageUtils.getStorageData<Collection[]>('collections')) ?? []

      // If message connection is successful, process the response, add the collection to storage
      try {
        // Get the strings from the client page
        const { data } = (await chrome.runtime.sendMessage('gobble')) as BackgroundMessage

        // Process the strings as page data with ids
        const pageData: PageData = {
          origin: data.origin,
          host: data.host,
          data: data.data.map(SvgUtils.createStorageSvg),
        }

        // Create classes and process the raw svg elements
        const svgClasses = await svgFactory.process(pageData)

        // Update the page data with the processed strings
        pageData.data = svgClasses.map((item) => ({
          svg: item.originalString,
          id: item.id,
        }))

        collection.name = data.host
        collection.origin = data.origin
        await StorageUtils.setPageData(collection.id, pageData)
        await StorageUtils.setStorageData('collections', [collection, ...prevCollections])

        // Initialize the plugins for the export panel if it doesn't exist
        const plugins = await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')
        if (!plugins) await StorageUtils.setStorageData('plugins', defaultSvgoPlugins)
      } catch (error) {
        // The listener has been removed, so the background script is no longer listening
        // This fires when the extension is reloaded as we're managing all routes in memory
        // It's pretty hard to get here without the browser extension
        return prevCollections[0].id
      }

      return collection.id
    })(),
  })
}
