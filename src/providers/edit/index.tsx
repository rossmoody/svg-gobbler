import { Dispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react'

import { EditAction, EditState, editReducer, initEditState } from './reducer'

export type EditContextProps = {
  dispatch: Dispatch<EditAction>
  state: EditState
}

const EditContext = createContext({} as EditContextProps)

export const EditProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(editReducer, initEditState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <EditContext.Provider value={memo}>{children}</EditContext.Provider>
}

export const useEdit = () => useContext(EditContext)
