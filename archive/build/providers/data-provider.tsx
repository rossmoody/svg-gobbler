import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import processElements from '../../process/process-elements'
import { AppData } from '../types'
import { paginateContent } from './helpers'

interface DataContextProps {
  data: AppData
  setData: Dispatch<SetStateAction<AppData>>
}

const DataContext = createContext({} as DataContextProps)

export const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<AppData>([])

  const value = useMemo(() => ({ data, setData }), [data])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData((prevData) => {
        return prevData.length < 1 ? 'empty' : prevData
      })
    }, 10000)

    return () => clearTimeout(timeout)
  }, [])

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { action, data, location } = message

    if (action === 'gobble') {
      processElements(data, location).then((result) => {
        if (result.length < 1) {
          setData('empty')
          return
        }

        setData(paginateContent(result))
      })
    }

    sendResponse('') // Send a response to keep the port open
  })

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
