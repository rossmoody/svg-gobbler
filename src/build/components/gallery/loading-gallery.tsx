import React from 'react'
import { Center, Box, useColorModeValue, Spinner } from '@chakra-ui/react'

const LoadingGallery = () => {
  return (
    <Box p="8" bg={useColorModeValue('gray.100', 'gray.800')}>
      <Center maxW="7xl" minH="400px" mx="auto">
        <Spinner size="xl" thickness="4px" emptyColor="white" color="red.500" />
      </Center>
    </Box>
  )
}

export default LoadingGallery
