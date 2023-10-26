import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const ToolbarFrame = ({ children }: Props) => (
  <Box
    p="4"
    bg={useColorModeValue('white', 'gray.800')}
    as="header"
    position="sticky"
    top={0}
    zIndex="banner"
  >
    <Box maxW="7xl" mx="auto">
      <Stack
        spacing="5"
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
      >
        {children}
      </Stack>
    </Box>
  </Box>
)
