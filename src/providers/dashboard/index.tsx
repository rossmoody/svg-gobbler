import { Dispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react'

import { DashboardAction, DashboardState, dashboardReducer, initDashboardState } from './reducer'

export type DashboardContextProps = {
  dispatch: Dispatch<DashboardAction>
  state: DashboardState
}

const DashboardContext = createContext({} as DashboardContextProps)

export const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(dashboardReducer, initDashboardState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <DashboardContext.Provider value={memo}>{children}</DashboardContext.Provider>
}

export const useDashboard = () => useContext(DashboardContext)
