import React, { useEffect } from 'react'
import { Divider } from '@chakra-ui/react'

import SVG from '../../find/scripts/svg-class'
import { Toolbar, Footer, Gallery, Navbar, DropZone } from '../components'
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

const sessionStorageData = (): SVG[][] | undefined => {
  const windowId = window.location.host
  const data = sessionStorage.getItem(windowId)
  if (data) return JSON.parse(data)
  return undefined
}

const Layout = () => {
  const [data, setData] = React.useState<AppData>()
  const [location, setLocation] = React.useState<string>('Dashboard')

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

  /**
   * This forces a state update to render a system page when a user
   * navigates back to a page and there is no session storage
   * or message to prompt a re-render.
   */
  const timeout = React.useRef<NodeJS.Timeout | undefined>()

  React.useEffect(() => {
    if (timeout.current !== undefined) clearTimeout(timeout.current)

    if (data === undefined)
      timeout.current = global.setTimeout(() => {
        setData('system')
      }, 3000)
  }, [data, timeout])

  return (
    <ThemeProvider>
      <DropZone setData={setData}>
        <Navbar />
        <Divider />
        <Toolbar data={data} setData={setData} location={location} />
        <Gallery data={data} setData={setData} />
        <Divider />
        <Footer />
      </DropZone>
    </ThemeProvider>
  )
}

export default Layout
