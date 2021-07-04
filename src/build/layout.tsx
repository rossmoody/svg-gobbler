import React from 'react'
import theme from './theme/theme'
import { ChakraProvider, Divider } from '@chakra-ui/react'
import { Toolbar, Footer, Gallery, Navbar } from './components'
import { SVG } from '../find/scripts/create-svg'

export type AppData = SVG[] | undefined

const getSessionStorageData = (): AppData => {
  const windowId = window.location.host
  let data = sessionStorage.getItem(windowId)
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

  return (
    <ChakraProvider theme={theme}>
      {console.log(data)}
      <Navbar />
      <Divider />
      <Toolbar data={data} />
      <Gallery data={data} />
      <Footer />
    </ChakraProvider>
  )
}

export default Layout
