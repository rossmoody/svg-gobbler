import type { Collection, PageData } from 'src/types'

import { useLocation, useNavigate } from 'react-router-dom'
import { initCollection } from 'src/constants/collection'
import { useDashboard } from 'src/providers'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export function useRemoveCollection() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { dispatch, state } = useDashboard()

  return function (collection: Collection) {
    const isActiveCollection = pathname.includes(collection.id)
    const filteredCollections = state.collections.filter(({ id }) => id !== collection.id)

    // If there are no collections left, create an empty one
    if (filteredCollections.length === 0) {
      const pageData: PageData = {
        data: [],
        host: '',
        href: '',
        origin: '',
      }

      filteredCollections.push(initCollection)
      StorageUtilities.setPageData(initCollection.id, pageData)
    }

    dispatch({ payload: filteredCollections, type: 'set-collections' })
    chrome.storage.local.remove(collection.id)
    StorageUtilities.setStorageData('collections', filteredCollections)

    if (isActiveCollection) {
      return navigate(`collection/${filteredCollections[0].id}`)
    }
  }
}
