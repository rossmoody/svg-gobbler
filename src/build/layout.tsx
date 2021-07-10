import React from 'react'
import { Divider } from '@chakra-ui/react'

import { SVG } from '../find/scripts/create-svg'

import { Toolbar, Footer, Gallery, Navbar } from './components'
import ThemeProvider from './theme/theme-provider'

export type AppData = SVG[] | undefined

const getSessionStorageData = (): AppData => {
  const windowId = window.location.host
  const data = sessionStorage.getItem(windowId)
  if (data) return JSON.parse(data)
}

const Layout = () => {
  const [data, setData] = React.useState(getSessionStorageData())

  chrome.runtime.onMessage.addListener((message) => {
    const data: SVG[] = message.data

    if (data) {
      setData(data)
      const json = JSON.stringify(data)
      sessionStorage.setItem(window.location.host, json)
    }
  })

  /**
   * Occassionally a message doesn't resolve when being sent by the tab.
   * This forces a state update to render the appropriate error communication.
   */
  const timeout = React.useRef<NodeJS.Timeout | undefined>()

  React.useEffect(() => {
    if (timeout.current !== undefined) clearTimeout(timeout.current)

    if (data === undefined)
      timeout.current = setTimeout(() => {
        setData([])
      }, 3000)
  }, [data, timeout])

  return (
    <ThemeProvider>
      <Navbar />
      <Divider />
      <Toolbar data={data} />
      <Gallery data={data} />
      <Divider />
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
