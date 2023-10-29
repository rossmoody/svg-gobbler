import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Copyright } from './copyright'

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    bg={useColorModeValue('white', 'gray.800')}
  >
    <Stack maxW="7xl" mx="auto" py="12" px={{ base: '4', md: '8' }}>
      <Copyright />
    </Stack>
  </Box>
)

export default Footer
