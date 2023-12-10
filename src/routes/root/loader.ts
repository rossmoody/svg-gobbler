import { nanoid } from 'nanoid'
import { defer } from 'react-router-dom'
import { SvgoPlugin, defaultSvgoPlugins } from 'src/constants/svgo-plugins'
import { BackgroundMessage, Collection, PageData } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'
import { svgFactory } from 'svg-gobbler-scripts'

/**
 * The primary initialization function for the root route.
 * Adds the initial collection to storage and redirects to the collection created.
 *
 * The only time we see this is on refresh or when the extension is invoked from the browser action.
 */
export async function rootLoader() {
  return defer({
    collectionId: (async () => {
      // Get all collections from storage for sidenav
      const prevCollections = (await StorageUtils.getStorageData<Collection[]>('collections')) ?? []

      try {
        // Get the strings from the client page
        const { data } = (await chrome.runtime.sendMessage('gobble')) as BackgroundMessage

        // On a settings page and has a collection, send to the first collection
        if (!data.origin && prevCollections.length) {
          throw new Error('Browser system page, send to first collection')
        }

        // Process the strings as page data with ids
        const pageData: PageData = {
          data: data.data,
          host: data.host,
          origin: data.origin,
        }

        // Create classes and process the raw svg elements
        const svgClasses = await svgFactory.process(pageData)

        // Update the page data with the processed strings
        pageData.data = svgClasses.map((item) => ({
          id: item.id,
          svg: item.originalString,
        }))

        const collection: Collection = {
          id: nanoid(),
          name: data.host,
          origin: data.origin,
        }

        await StorageUtils.setPageData(collection.id, pageData)
        await StorageUtils.setStorageData('collections', [collection, ...prevCollections])

        // Initialize the plugins for the export panel if it doesn't exist
        const plugins = await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')
        if (!plugins) await StorageUtils.setStorageData('plugins', defaultSvgoPlugins)

        return collection.id
      } catch (error) {
        // This catch is reached more than you'd think
        // 1. The listener has been removed, so the background script is no longer listening on refresh
        // 2. Send the user to the first collection if they invoke on a browser system page
        return prevCollections[0].id
      }
    })(),
  })
}
