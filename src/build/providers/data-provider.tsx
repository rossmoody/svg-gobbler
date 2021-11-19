import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
  useRef,
} from 'react'

import { AppData, MessageData } from '../types'

import { sessionStorageData, paginateContent } from './utils'

interface DataContextProps {
  data: AppData
  setData: React.Dispatch<React.SetStateAction<AppData>>
}

const DataContext = createContext({} as DataContextProps)

export const DataProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AppData>()

  const value = useMemo(() => ({ data, setData }), [data])

  useEffect(() => {
    const sessionData = sessionStorageData()
    if (sessionData) setData(sessionData)
  }, [])

  useEffect(() => {
    if (data instanceof Array) {
      const json = JSON.stringify(data)
      sessionStorage.setItem(window.location.host, json)
    }
  }, [data])

  /**
   * This forces a state update to render a system page when a user
   * navigates back to a page and there is no session storage
   * or message to prompt a re-render.
   */
  const timeout = useRef<NodeJS.Timeout | undefined>()

  useEffect(() => {
    if (timeout.current !== undefined) clearTimeout(timeout.current)

    if (data === undefined)
      timeout.current = global.setTimeout(() => {
        setData('error')
      }, 3000)
  }, [data, timeout])

  chrome.runtime.onMessage.addListener((message: MessageData) => {
    const content = message.data.content

    switch (content) {
      case 'system': {
        setData('system')
        break
      }

      case 'empty': {
        setData('empty')
        break
      }

      default: {
        if (Array.isArray(content)) {
          setData(paginateContent(content))
        } else {
          setData('error')
        }

        break
      }
    }
  })

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
