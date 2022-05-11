import { Divider } from '@chakra-ui/react'
import React from 'react'
import { DropZone, Footer, Gallery, Navbar, Toolbar } from '../components'
import { DataProvider } from '../providers/data-provider'
import { LocationProvider } from '../providers/location-provider'
import { OptionsProvider } from '../providers/options-provider'
import { ThemeProvider } from '../providers/theme-provider'

const Layout = () => {
  return (
    <ThemeProvider>
      <LocationProvider>
        <DataProvider>
          <DropZone>
            <Navbar />
            <Divider />
            <Toolbar />
            <OptionsProvider>
              <Gallery />
            </OptionsProvider>
            <Divider />
            <Footer />
          </DropZone>
        </DataProvider>
      </LocationProvider>
    </ThemeProvider>
  )
}

export default Layout
