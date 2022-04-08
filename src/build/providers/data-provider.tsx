import React, { createContext, useContext, useMemo, useState } from 'react'

import { AppData } from '../types'

import { paginateContent } from './utils'
import processElements from '../../find/process-elements'

interface DataContextProps {
  data: AppData
  setData: React.Dispatch<React.SetStateAction<AppData>>
}

const DataContext = createContext({} as DataContextProps)

export const DataProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AppData>([])

  const value = useMemo(() => ({ data, setData }), [data])

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'gobble') {
      setData([])
      processElements(message.data).then((result) => {
        if (result.length < 1) return setData('empty')
        setData(paginateContent(result))
      })
    }

    sendResponse('')
  })

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
