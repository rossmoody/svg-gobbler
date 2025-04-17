import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'

import { DetailsAction, detailsReducer, DetailsState, initDetailsState } from './reducer'

export type DetailsContextProperties = {
  dispatch: Dispatch<DetailsAction>
  state: DetailsState
}

const DetailsContext = createContext({} as DetailsContextProperties)

export const DetailsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(detailsReducer, initDetailsState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <DetailsContext.Provider value={memo}>{children}</DetailsContext.Provider>
}

export const useDetails = () => useContext(DetailsContext)
