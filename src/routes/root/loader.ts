import _ from 'lodash'
import { nanoid } from 'nanoid'
import { defer } from 'react-router-dom'
import { SvgoPlugin } from 'src/constants/svgo-plugins'
import { CollectionState, initCollectionState, initUserState, type UserState } from 'src/providers'
import { svgFactory } from 'src/scripts'
import { BackgroundMessage, Collection, PageData } from 'src/types'
import { logger } from 'src/utilities/logger'
import { RootUtilities } from 'src/utilities/root-utilities'
import { StorageUtilities } from 'src/utilities/storage-utilities'
import { SvgUtilities } from 'src/utilities/svg-utilities'

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
      let user = await StorageUtilities.getStorageData<UserState>('user')
      user = _.merge(initUserState, user)
      await StorageUtilities.setStorageData('user', user)

      // Initialize the view state
      let view = await StorageUtilities.getStorageData<CollectionState['view']>('view')
      view = _.merge(initCollectionState.view, view)
      await StorageUtilities.setStorageData('view', view)

      // Initialize the plugins for the export panel
      let plugins = await StorageUtilities.getStorageData<SvgoPlugin[]>('plugins')
      plugins = _.assign([], plugins)
      await StorageUtilities.setStorageData('plugins', plugins)

      // Get all collections from storage for sidenav
      const previousCollections =
        (await StorageUtilities.getStorageData<Collection[]>('collections')) ?? []

      // Early return if the user is refreshing
      const navigationEntries = performance.getEntriesByType(
        'navigation',
      ) as PerformanceNavigationTiming[]
      if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
        return previousCollections[0].id
      }

      try {
        // Get the strings from the client page. This will fail on refresh and force the catch
        const { data } = (await chrome.runtime.sendMessage('gobble')) as BackgroundMessage

        // On a settings page and has a collection, send to the first collection
        if (!data.origin && previousCollections.length > 0) {
          throw new Error('Browser system page, send to first collection')
        }

        // Create classes and process the raw svg elements
        const svgClasses = await svgFactory.process(data)

        const storageSvgs = SvgUtilities.createStorageSvgs(svgClasses)

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
        let collections = [...previousCollections]

        // Merge the collections if the user has the setting and the URL is a duplicate
        if (
          user.settings.mergeCollections &&
          RootUtilities.isDuplicateURL(pageData.href, previousCollections)
        ) {
          collection = RootUtilities.getExistingCollection(pageData.href, previousCollections)! // Because we checked for duplicates
          const existingPageData = await StorageUtilities.getPageData(collection.id)
          pageData = RootUtilities.mergePageData(existingPageData, pageData)
        } else {
          collections = [collection, ...previousCollections]
        }

        // Sort the collections alphabetically if the user has the setting
        if (user.settings.sortCollections) {
          collections = collections.sort((a, b) => a.name.localeCompare(b.name))
        }

        await StorageUtilities.setStorageData('collections', collections)
        await StorageUtilities.setPageData(collection.id, pageData)

        return collection.id
      } catch (error) {
        logger.error(error)
        // This catch is reached more than you'd think
        // 1. The listener has been removed, so the background script is no longer listening on refresh
        // 2. Send the user to the first collection if they invoke on a browser system page
        return previousCollections[0].id
      }
    })(),
  })
}
