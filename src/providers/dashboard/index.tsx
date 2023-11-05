import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { DashboardAction, DashboardState, initDashboardState, sidebarReducer } from './reducer'

export type DashboardContextProps = {
  state: DashboardState
  dispatch: Dispatch<DashboardAction>
}

const DashboardContext = createContext({} as DashboardContextProps)

export const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(sidebarReducer, initDashboardState)

  const memo = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <DashboardContext.Provider value={memo}>{children}</DashboardContext.Provider>
}

export const useDashboard = () => useContext(DashboardContext)
