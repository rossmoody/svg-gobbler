import React from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'

import Subhead from './card-footer-subhead'
import Body from './card-footer-body'

interface CardFooter {
  size: string
  type: string
}

const CardFooter = ({ size, type }: CardFooter) => {
  return (
    <SimpleGrid minChildWidth="30px" spacing={2}>
      <Box>
        <Subhead>Type</Subhead>
        <Body>{type.charAt(0).toUpperCase() + type.slice(1)}</Body>
      </Box>
      <Box>
        <Subhead>Size</Subhead>
        <Body>{size}</Body>
      </Box>
    </SimpleGrid>
  )
}

export default CardFooter
