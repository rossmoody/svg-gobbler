import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { AppData } from '../types'

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
    const sessionStorageCharacterLimit = 4500000
    const json = JSON.stringify(data)

    if (json.length < sessionStorageCharacterLimit) {
      sessionStorage.setItem(window.location.host, json)
    }
  }, [data])

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === 'gobble') {
      setData([])
      processElements(message.data).then((result) => {
        setData(paginateContent(result))
      })
    }

    return true
  })

  chrome.tabs.onRemoved.addListener(() => {
    setData([])
  })

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
