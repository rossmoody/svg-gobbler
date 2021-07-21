import React from 'react'
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'

import Card from '../card'
import SVG from '../../../find/scripts/svg-class'

interface GalleryData {
  data: SVG[]
}

const DataGallery = ({ data }: GalleryData) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.800')

  return (
    <Box p="8" bg={backgroundColor} as="main">
      <Box maxW="7xl" mx="auto">
        <SimpleGrid minChildWidth="240px" spacing="24px">
          {data.map((svg) => (
            <Card key={svg.id} data={svg} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default DataGallery
