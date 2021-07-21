import React, { useEffect } from 'react'
import { Divider } from '@chakra-ui/react'

import SVG from '../../find/scripts/svg-class'
import { Toolbar, Footer, Gallery, Navbar } from '../components'
import { AppData, MessageData } from '../types'
import ThemeProvider from '../theme/theme-provider'

function paginateContent(content: SVG[]) {
  const perPage = 100

  if (content.length <= perPage) return [content]

  const result = content.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perPage)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [] as SVG[][])

  return result
}

// * Stores data as a session coookie for data persistence on page refresh
const sessionStorageData = (): SVG[][] | undefined => {
  const windowId = window.location.host
  const data = sessionStorage.getItem(windowId)
  if (data) return JSON.parse(data)
}

const Layout = () => {
  const [data, setData] = React.useState<AppData>(sessionStorageData())
  const [location, setLocation] = React.useState<string>('Dashboard')

  useEffect(() => {
    if (data instanceof Array) {
      const json = JSON.stringify(data)
      sessionStorage.setItem(window.location.host, json)
    }
  }, [data])

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
        setLocation(message.data.location)
        setData(paginateContent(content!))
        break
      }
    }
  })

  return (
    <ThemeProvider>
      <Navbar />
      <Divider />
      <Toolbar data={data} setData={setData} location={location} />
      <Gallery data={data} setData={setData} />
      <Divider />
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
