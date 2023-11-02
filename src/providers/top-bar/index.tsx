import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { initTopBarState, sidebarReducer, TopBarAction, TopBarState } from './reducer'

export type TopBarContextProps = {
  state: TopBarState
  dispatch: Dispatch<TopBarAction>
}

const TopBarContext = createContext({} as TopBarContextProps)

export const TopBarProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(sidebarReducer, initTopBarState)

  const memo = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <TopBarContext.Provider value={memo}>{children}</TopBarContext.Provider>
}

export const useTopBar = () => useContext(TopBarContext)
