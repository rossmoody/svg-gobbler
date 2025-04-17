import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'

import { ExportAction, exportReducer, ExportState, initExportState } from './reducer'

export type ExportContextProperties = {
  dispatch: Dispatch<ExportAction>
  state: ExportState
}

const ExportContext = createContext({} as ExportContextProperties)

export const ExportProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(exportReducer, initExportState)

  const memo = useMemo(() => {
    return { dispatch, state }
  }, [state, dispatch])

  return <ExportContext.Provider value={memo}>{children}</ExportContext.Provider>
}

export const useExport = () => useContext(ExportContext)
