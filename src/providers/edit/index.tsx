import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'

import { EditAction, editReducer, EditState, initEditState } from './reducer'

export type EditContextProperties = {
  dispatch: Dispatch<EditAction>
  state: EditState
}

const EditContext = createContext({} as EditContextProperties)

export const EditProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(editReducer, initEditState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <EditContext.Provider value={memo}>{children}</EditContext.Provider>
}

export const useEdit = () => useContext(EditContext)
