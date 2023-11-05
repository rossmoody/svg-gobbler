import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import type { CollectionAction, CollectionState } from './reducer'
import { initCollectionState, sidebarReducer } from './reducer'

export type CollectionContextProps = {
  state: CollectionState
  dispatch: Dispatch<CollectionAction>
}

const CollectionContext = createContext({} as CollectionContextProps)

export const CollectionProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(sidebarReducer, initCollectionState)

  const memo = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <CollectionContext.Provider value={memo}>{children}</CollectionContext.Provider>
}

export const useCollection = () => useContext(CollectionContext)
