import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import type { CollectionData } from 'src/types'
import type { CollectionAction } from './reducer'
import { initCollectionState, sidebarReducer } from './reducer'

export type CollectionContextProps = {
  state: CollectionData
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
