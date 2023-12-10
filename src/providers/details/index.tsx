import { Dispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react'

import { DetailsAction, DetailsState, detailsReducer, initDetailsState } from './reducer'

export type DetailsContextProps = {
  dispatch: Dispatch<DetailsAction>
  state: DetailsState
}

const DetailsContext = createContext({} as DetailsContextProps)

export const DetailsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(detailsReducer, initDetailsState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <DetailsContext.Provider value={memo}>{children}</DetailsContext.Provider>
}

export const useDetails = () => useContext(DetailsContext)
