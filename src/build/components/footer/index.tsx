import React from 'react'
import Logo from './logo'
import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import { Copyright } from './copyright'
import { SocialMediaLinks } from './social-media-links'

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    bg={useColorModeValue('white', 'gray.800')}
  >
    <Stack maxW="7xl" mx="auto" py="12" px={{ base: '4', md: '8' }}>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Logo size={28} />
        <SocialMediaLinks />
      </Stack>
      <Copyright />
    </Stack>
  </Box>
)

export default Footer
