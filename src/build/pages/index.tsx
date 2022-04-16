import { Divider } from '@chakra-ui/react'
import React from 'react'
import { DropZone, Footer, Gallery, Navbar, Toolbar } from '../components'
import { DataProvider } from '../providers/data-provider'
import { LocationProvider } from '../providers/location-provider'
import { ThemeProvider } from '../providers/theme-provider'

const Layout = () => {
  return (
    <LocationProvider>
      <DataProvider>
        <ThemeProvider>
          <DropZone>
            <Navbar />
            <Divider />
            <Toolbar />
            <Gallery />
            <Divider />
            <Footer />
          </DropZone>
        </ThemeProvider>
      </DataProvider>
    </LocationProvider>
  )
}

export default Layout
