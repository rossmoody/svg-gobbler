import { Dispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react'

import {
  type CollectionAction,
  type CollectionState,
  collectionReducer,
  initCollectionState,
} from './reducer'

export type CollectionContextProps = {
  dispatch: Dispatch<CollectionAction>
  state: CollectionState
}

const CollectionContext = createContext({} as CollectionContextProps)

export const CollectionProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(collectionReducer, initCollectionState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <CollectionContext.Provider value={memo}>{children}</CollectionContext.Provider>
}

export const useCollection = () => useContext(CollectionContext)
