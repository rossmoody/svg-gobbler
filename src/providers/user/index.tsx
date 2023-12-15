import { Dispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react'

import { UserAction, UserState, initUserState, userReducer } from './reducer'

export type UserContextProps = {
  dispatch: Dispatch<UserAction>
  state: UserState
}

const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initUserState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
