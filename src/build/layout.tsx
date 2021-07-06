import React from 'react'
import { ChakraProvider, Divider } from '@chakra-ui/react'

import { SVG } from '../find/scripts/create-svg'

import theme from './theme/theme'
import { Toolbar, Footer, Gallery, Navbar } from './components'

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

  setTimeout(() => {
    if (data === undefined) setData([] as SVG[])
  }, 4000)

  console.log(data)

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Divider />
      <Toolbar data={data} />
      <Gallery data={data} />
      <Divider />
      <Footer />
    </ChakraProvider>
  )
}

export default Layout
