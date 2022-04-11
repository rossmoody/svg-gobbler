import React, { createContext, useContext, useMemo, useState } from 'react'
import { AppData } from '../types'
import processElements from '../../find/process-elements'
import SVG from '../../find/svg-class'

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

function paginateContent(content: SVG[]) {
  const perPage = 100

  if (content.length <= perPage) return [content]

  return content.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perPage)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [] as SVG[][])
}
