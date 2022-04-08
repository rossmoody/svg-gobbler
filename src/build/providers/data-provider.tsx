import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { AppData } from '../types'
import { executeScript, getActiveTab } from '../../find/chrome-helpers'
import gatherElements from '../../find/gather-elements'

import { paginateContent, sessionStorageData } from './utils'
import processElements from '../../find/process-elements'

interface DataContextProps {
  data: AppData
  setData: React.Dispatch<React.SetStateAction<AppData>>
}

const DataContext = createContext({} as DataContextProps)

export const DataProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AppData>([])

  const value = useMemo(() => ({ data, setData }), [data])

  useEffect(() => {
    const sessionData = sessionStorageData()
    if (sessionData) setData(sessionData)
  }, [])

  useEffect(() => {
    if (data instanceof Array) {
      const sessionStorageCharacterLimit = 4500000
      const json = JSON.stringify(data)

      if (json.length < sessionStorageCharacterLimit) {
        sessionStorage.setItem(window.location.host, json)
      }
    }
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await getActiveTab()

      if (id) {
        const elements = await executeScript(id, gatherElements)
        const processed = await processElements(elements)
        setData(paginateContent(processed))
      }
    }

    fetchData().catch(console.error)
  }, [])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
