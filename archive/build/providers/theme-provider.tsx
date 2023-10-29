import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

const config = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: '100%',
      },
    },
  },
})

const ThemeProvider: React.FC = ({ children }) => (
  <ChakraProvider theme={config}>{children}</ChakraProvider>
)

export { ThemeProvider }
