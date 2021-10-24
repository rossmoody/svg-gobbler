import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const config = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: '100%',
      },
    },
  },
})

const ThemeProvider: React.FC = ({ children }) => {
  return <ChakraProvider theme={config}>{children}</ChakraProvider>
}

export { ThemeProvider }
