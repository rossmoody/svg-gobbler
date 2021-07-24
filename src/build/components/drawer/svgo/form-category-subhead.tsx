import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const Subhead: React.FC = ({ children }) => {
  return (
    <Box mb="4">
      <Text
        as="h3"
        fontWeight="bold"
        fontSize="xs"
        color="gray.400"
        textTransform="uppercase"
      >
        {children}
      </Text>
    </Box>
  )
}

export { Subhead }
