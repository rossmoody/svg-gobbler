import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { ExportAction, exportReducer, ExportState, initExportState } from './reducer'

export type ExportContextProps = {
  state: ExportState
  dispatch: Dispatch<ExportAction>
}

const ExportContext = createContext({} as ExportContextProps)

export const ExportProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(exportReducer, initExportState)

  const memo = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <ExportContext.Provider value={memo}>{children}</ExportContext.Provider>
}

export const useExport = () => useContext(ExportContext)
