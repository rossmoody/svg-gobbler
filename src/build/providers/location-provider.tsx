import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import { MessageData } from '../types'

interface LocationContextProps {
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}

const LocationContext = createContext({} as LocationContextProps)

export const LocationProvider: React.FC = ({ children }) => {
  const [location, setLocation] = useState('Dashboard')

  const locationMemo = useMemo(
    () => ({
      location,
      setLocation,
    }),
    [location]
  )

  chrome.runtime.onMessage.addListener((message: MessageData) => {
    const location = message.data.location
    if (location) setLocation(location)
  })

  return (
    <LocationContext.Provider value={locationMemo}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => {
  return useContext(LocationContext)
}
