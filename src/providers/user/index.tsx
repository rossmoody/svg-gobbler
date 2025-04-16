import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'

import { initUserState, UserAction, userReducer, UserState } from './reducer'

export type UserContextProperties = {
  dispatch: Dispatch<UserAction>
  state: UserState
}

const UserContext = createContext({} as UserContextProperties)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initUserState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
