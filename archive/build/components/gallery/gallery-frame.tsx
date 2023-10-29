import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const GalleryFrame = ({ children }: Props) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.800')

  return (
    <Box p="8" bg={backgroundColor} as="main">
      <Box maxW="7xl" mx="auto">
        {children}
      </Box>
    </Box>
  )
}
