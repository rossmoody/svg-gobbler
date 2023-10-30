import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { initSidebarState, SidebarAction, sidebarReducer, SidebarState } from './reducer'

export type SidebarContextProps = {
  state: SidebarState
  dispatch: Dispatch<SidebarAction>
}

const SidebarContext = createContext({} as SidebarContextProps)

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(sidebarReducer, initSidebarState)

  const memo = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <SidebarContext.Provider value={memo}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => useContext(SidebarContext)
