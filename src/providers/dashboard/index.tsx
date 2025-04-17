import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'

import { DashboardAction, dashboardReducer, DashboardState, initDashboardState } from './reducer'

export type DashboardContextProperties = {
  dispatch: Dispatch<DashboardAction>
  state: DashboardState
}

const DashboardContext = createContext({} as DashboardContextProperties)

export const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(dashboardReducer, initDashboardState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <DashboardContext.Provider value={memo}>{children}</DashboardContext.Provider>
}

export const useDashboard = () => useContext(DashboardContext)
