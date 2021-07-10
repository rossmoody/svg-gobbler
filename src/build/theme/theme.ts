import { extendTheme } from '@chakra-ui/react'

const config = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        fontSize: '100%',
      },
    },
  },
})

export default config
