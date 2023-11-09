import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { DetailsAction, DetailsState, initDetailsState, sidebarReducer } from './reducer'

export type DetailsContextProps = {
  state: DetailsState
  dispatch: Dispatch<DetailsAction>
}

const DetailsContext = createContext({} as DetailsContextProps)

export const DetailsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(sidebarReducer, initDetailsState)

  const memo = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <DetailsContext.Provider value={memo}>{children}</DetailsContext.Provider>
}

export const useDetails = () => useContext(DetailsContext)
