import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import type { MainAction, MainState } from './reducer'
import { initMainState, sidebarReducer } from './reducer'

export type MainContextProps = {
  state: MainState
  dispatch: Dispatch<MainAction>
}

const MainContext = createContext({} as MainContextProps)

export const MainProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(sidebarReducer, initMainState)

  const memo = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <MainContext.Provider value={memo}>{children}</MainContext.Provider>
}

export const useMain = () => useContext(MainContext)
