import { nanoid } from 'nanoid'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDashboard } from 'src/providers'
import type { Collection } from 'types'

export function useRemoveCollection() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { state, dispatch } = useDashboard()

  return function (collection: Collection) {
    const isActiveCollection = pathname.includes(collection.id)
    const filteredCollections = state.collections.filter(({ id }) => id !== collection.id)

    if (filteredCollections.length === 0) {
      // If there are no collections left, create an empty one
      const emptyCollection: Collection = { id: nanoid(), name: 'New Collection', origin: '' }
      filteredCollections.push(emptyCollection)
      chrome.storage.local.set({ [emptyCollection.id]: [] })
    }

    dispatch({ type: 'set-collections', payload: filteredCollections })
    chrome.storage.local.set({ collections: filteredCollections })
    chrome.storage.local.remove(collection.id)

    if (isActiveCollection) {
      return navigate(`collection/${filteredCollections[0].id}`)
    }
  }
}
