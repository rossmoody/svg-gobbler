import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { initMainPanelState, MainPanelAction, MainPanelState, sidebarReducer } from './reducer'

export type MainPanelContextProps = {
  state: MainPanelState
  dispatch: Dispatch<MainPanelAction>
}

const MainPanelContext = createContext({} as MainPanelContextProps)

export const MainPanelProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(sidebarReducer, initMainPanelState)

  const memo = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <MainPanelContext.Provider value={memo}>{children}</MainPanelContext.Provider>
}

export const useMainPanel = () => useContext(MainPanelContext)
