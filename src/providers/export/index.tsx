import { Dispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react'

import { ExportAction, ExportState, exportReducer, initExportState } from './reducer'

export type ExportContextProps = {
  dispatch: Dispatch<ExportAction>
  state: ExportState
}

const ExportContext = createContext({} as ExportContextProps)

export const ExportProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(exportReducer, initExportState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <ExportContext.Provider value={memo}>{children}</ExportContext.Provider>
}

export const useExport = () => useContext(ExportContext)
