import React from 'react'
import { Box, SimpleGrid, useColorModeValue, ScaleFade } from '@chakra-ui/react'

import SVG from '../../../find/scripts/svg-class'
import Card from '../card'

import LoadingGallery from './loading-gallery'
import NoResultsError from './no-results-error'

interface GalleryData {
  data: SVG[] | undefined
}

const Gallery = ({ data }: GalleryData) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.800')

  if (!data) return <LoadingGallery />

  /**
   * If Gobbler is prompted immediately on page load sometimes it sends empty
   * data object that doesn't resolve. This handles that. Likely a better solve.
   */
  if (data.length === 0) return <NoResultsError />

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
