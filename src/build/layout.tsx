import React from 'react'
import { Divider } from '@chakra-ui/react'

import SVG from '../find/scripts/svg-class'

import { Toolbar, Footer, Gallery, Navbar } from './components'
import { AppData } from './types'
import ThemeProvider from './theme/theme-provider'

const sessionStorageData = (): SVG[] | undefined => {
  const windowId = window.location.host
  const data = sessionStorage.getItem(windowId)
  if (data) return JSON.parse(data)
}

const Layout = () => {
  const [data, setData] = React.useState<AppData>(sessionStorageData())

  chrome.runtime.onMessage.addListener((message) => {
    const data: AppData = message.data

    switch (data) {
      case 'system': {
        setData('system')
        break
      }

      case 'empty': {
        setData('empty')
        break
      }

      default: {
        setData(data)
        const json = JSON.stringify(data)
        sessionStorage.setItem(window.location.host, json)
        break
      }
    }
  })

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
