import React from 'react'
import { Box, SimpleGrid, useColorModeValue, ScaleFade } from '@chakra-ui/react'
import Card from './card'
import LoadingGallery from './loading-gallery'
import { AppData } from '../../layout'

interface GalleryData {
  data: AppData
}

const Gallery = ({ data }: GalleryData) => {
  if (!data) return <LoadingGallery />

  return (
    <Box p="8" bg={useColorModeValue('gray.100', 'gray.800')} as="main">
      <Box maxW="7xl" mx="auto">
        <ScaleFade in={true} initialScale={0.9}>
          <SimpleGrid minChildWidth="240px" spacing="24px">
            {data.map((svg, i) => (
              <Card key={i} data={svg} />
            ))}
          </SimpleGrid>
        </ScaleFade>
      </Box>
    </Box>
  )
}

export default Gallery
