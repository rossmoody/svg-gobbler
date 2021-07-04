import React from 'react'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'

const Subhead: React.FC = ({ children }) => (
  <Text
    fontSize="xs"
    textTransform="uppercase"
    fontWeight="bold"
    color="gray.500"
  >
    {children}
  </Text>
)

const Body: React.FC = ({ children }) => (
  <Text fontSize="xl" fontWeight="medium">
    {children}
  </Text>
)

interface ICardFooter {
  size: string
  type: string
}

const CardFooter = ({ size, type }: ICardFooter) => {
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
