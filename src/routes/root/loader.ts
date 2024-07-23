import { nanoid } from 'nanoid'
import { defer } from 'react-router-dom'
import { SvgoPlugin, defaultSvgoPlugins } from 'src/constants/svgo-plugins'
import { initUserState } from 'src/providers'
import { BackgroundMessage, Collection, PageData } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'
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
      // Initialize user
      const user = await StorageUtils.getStorageData('user')
      if (!user) {
        await StorageUtils.setStorageData('user', initUserState)
      }

      // Get all collections from storage for sidenav
      const prevCollections = (await StorageUtils.getStorageData<Collection[]>('collections')) ?? []

      try {
        // Get the strings from the client page. This will fail on refresh and force the catch
        const { data } = (await chrome.runtime.sendMessage('gobble')) as BackgroundMessage

        // On a settings page and has a collection, send to the first collection
        if (!data.origin && prevCollections.length) {
          throw new Error('Browser system page, send to first collection')
        }

        // Create classes and process the raw svg elements
        const svgClasses = await svgFactory.process(data)

        // Create storage svgs from the svg classes
        const storageSvgs = SvgUtils.createStorageSvgs(svgClasses)

        // Create the page data object
        const pageData: PageData = {
          data: storageSvgs,
          host: data.host,
          origin: data.origin,
        }

        const collection: Collection = {
          id: nanoid(),
          name: pageData.host,
          origin: pageData.origin,
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
