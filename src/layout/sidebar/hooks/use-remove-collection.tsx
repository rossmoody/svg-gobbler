import { nanoid } from 'nanoid'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSidebar } from 'src/providers'
import type { Collection } from 'types'

export function useRemoveCollection() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { state, dispatch } = useSidebar()

  return function (collection: Collection) {
    const isActiveCollection = pathname.includes(collection.id)
    const filteredCollections = state.collections.filter(({ id }) => id !== collection.id)

    // If there are no collections left, create an empty one
    if (filteredCollections.length === 0) {
      filteredCollections.push({ id: nanoid(), name: 'New Collection' })
    }

    dispatch({ type: 'set-collections', payload: filteredCollections })
    chrome.storage.local.set({ collections: filteredCollections })

    if (isActiveCollection) {
      return navigate(`collection/${filteredCollections[0].id}`)
    }
  }
}
