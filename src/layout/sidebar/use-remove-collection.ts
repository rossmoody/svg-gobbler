import type { Collection, PageData } from 'src/types'

import { nanoid } from 'nanoid'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDashboard } from 'src/providers'
import { loc } from 'src/utils/i18n'
import { StorageUtils } from 'src/utils/storage-utils'

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

      const collection: Collection = {
        href: '',
        id: nanoid(),
        name: loc('sidebar_new_collection'),
        origin: '',
      }

      filteredCollections.push(collection)
      StorageUtils.setPageData(collection.id, pageData)
    }

    dispatch({ payload: filteredCollections, type: 'set-collections' })
    chrome.storage.local.remove(collection.id)
    StorageUtils.setStorageData('collections', filteredCollections)

    if (isActiveCollection) {
      return navigate(`collection/${filteredCollections[0].id}`)
    }
  }
}
