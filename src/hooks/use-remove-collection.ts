import type { Collection } from 'src/types'

import { useLocation, useNavigate } from 'react-router-dom'
import { initCollection } from 'src/constants/collection'
import { pageData } from 'src/constants/page-data'
import { useDashboard } from 'src/providers'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export function useRemoveCollection() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { dispatch, state } = useDashboard()

  return function (collection: Collection) {
    const isActiveCollection = pathname.includes(collection.id)
    const collectionsWithoutRemoved = state.collections.filter(({ id }) => id !== collection.id)

    // If there are no collections left, create an empty one
    if (collectionsWithoutRemoved.length === 0) {
      const newCollection = initCollection()
      collectionsWithoutRemoved.push(newCollection)
      StorageUtilities.setPageData(newCollection.id, pageData)
    }

    dispatch({ payload: collectionsWithoutRemoved, type: 'set-collections' })
    chrome.storage.local.remove(collection.id)
    StorageUtilities.setStorageData('collections', collectionsWithoutRemoved)

    if (isActiveCollection) {
      return navigate(`collection/${collectionsWithoutRemoved[0].id}`)
    }
  }
}
