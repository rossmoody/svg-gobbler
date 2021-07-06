import React from 'react'
import { Box, SimpleGrid, useColorModeValue, ScaleFade } from '@chakra-ui/react'

import { AppData } from '../../layout'
import Card from '../card'

import LoadingGallery from './loading-gallery'

interface GalleryData {
  data: AppData
}

const Gallery = ({ data }: GalleryData) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.800')

  if (!data) return <LoadingGallery />

  return (
    <Box p="8" bg={backgroundColor} as="main">
      <Box maxW="7xl" mx="auto">
        <ScaleFade in initialScale={0.9}>
          <SimpleGrid minChildWidth="240px" spacing="24px">
            {data.map((svg) => (
              <Card key={svg.id} data={svg} />
            ))}
          </SimpleGrid>
        </ScaleFade>
      </Box>
    </Box>
  )
}

export default Gallery
