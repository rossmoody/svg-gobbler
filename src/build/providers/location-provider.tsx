import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

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

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'gobble') {
      const location = message.url
      if (location) setLocation(location)
    }

    return true
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
