import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'

import type { CollectionAction, CollectionState } from './reducer'

import { collectionReducer, initCollectionState } from './reducer'

export type CollectionContextProperties = {
  dispatch: Dispatch<CollectionAction>
  state: CollectionState
}

const CollectionContext = createContext({} as CollectionContextProperties)

export const CollectionProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(collectionReducer, initCollectionState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <CollectionContext.Provider value={memo}>{children}</CollectionContext.Provider>
}

export const useCollection = () => useContext(CollectionContext)
