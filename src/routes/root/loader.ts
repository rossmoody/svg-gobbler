import _ from 'lodash'
import { nanoid } from 'nanoid'
import { defer } from 'react-router-dom'
import { SvgoPlugin } from 'src/constants/svgo-plugins'
import { CollectionState, type UserState, initCollectionState, initUserState } from 'src/providers'
import { svgFactory } from 'src/scripts'
import { BackgroundMessage, Collection, PageData } from 'src/types'
import { logger } from 'src/utils/logger'
import { RootUtils } from 'src/utils/root-utils'
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
      // Initialize user
      let user = await StorageUtils.getStorageData<UserState>('user')
      user = _.merge(initUserState, user)
      await StorageUtils.setStorageData('user', user)

      // Initialize the view state
      let view = await StorageUtils.getStorageData<CollectionState['view']>('view')
      view = _.merge(initCollectionState.view, view)
      await StorageUtils.setStorageData('view', view)

      // Initialize the plugins for the export panel
      let plugins = await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')
      plugins = _.assign([], plugins)
      await StorageUtils.setStorageData('plugins', plugins)

      // Get all collections from storage for sidenav
      const prevCollections = (await StorageUtils.getStorageData<Collection[]>('collections')) ?? []

      // Early return if the user is refreshing
      const navigationEntries = performance.getEntriesByType(
        'navigation',
      ) as PerformanceNavigationTiming[]
      if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
        return prevCollections[0].id
      }

      try {
        // Get the strings from the client page. This will fail on refresh and force the catch
        const { data } = (await chrome.runtime.sendMessage('gobble')) as BackgroundMessage

        // On a settings page and has a collection, send to the first collection
        if (!data.origin && prevCollections.length) {
          throw new Error('Browser system page, send to first collection')
        }

        // Create classes and process the raw svg elements
        const svgClasses = await svgFactory.process(data)

        const storageSvgs = SvgUtils.createStorageSvgs(svgClasses)

        // Create the sourced page data object
        let pageData: PageData = {
          data: storageSvgs,
          host: data.host,
          href: data.href,
          origin: data.origin,
        }

        // Create a new collection
        let collection: Collection = {
          href: pageData.href,
          id: nanoid(),
          name: pageData.host,
          origin: pageData.origin,
        }

        // Establish the collections array
        let collections = [...prevCollections]

        // Merge the collections if the user has the setting and the URL is a duplicate
        if (
          user.settings.mergeCollections &&
          RootUtils.isDuplicateURL(pageData.href, prevCollections)
        ) {
          collection = RootUtils.getExistingCollection(pageData.href, prevCollections)! // Because we checked for duplicates
          const existingPageData = await StorageUtils.getPageData(collection.id)
          pageData = RootUtils.mergePageData(existingPageData, pageData)
        } else {
          collections = [collection, ...prevCollections]
        }

        // Sort the collections alphabetically if the user has the setting
        if (user.settings.sortCollections) {
          collections = collections.sort((a, b) => a.name.localeCompare(b.name))
        }

        await StorageUtils.setStorageData('collections', collections)
        await StorageUtils.setPageData(collection.id, pageData)

        return collection.id
      } catch (error) {
        logger.error(error)
        // This catch is reached more than you'd think
        // 1. The listener has been removed, so the background script is no longer listening on refresh
        // 2. Send the user to the first collection if they invoke on a browser system page
        return prevCollections[0].id
      }
    })(),
  })
}
