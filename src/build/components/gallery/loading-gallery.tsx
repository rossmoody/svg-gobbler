import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'
import { GalleryFrame } from './gallery-frame'

const LoadingGallery = () => (
  <GalleryFrame>
    <Center maxW="7xl" minH="400px" mx="auto">
      <Spinner size="xl" thickness="4px" emptyColor="white" color="red.500" />
    </Center>
  </GalleryFrame>
)

export default LoadingGallery
