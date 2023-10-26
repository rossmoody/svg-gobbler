import React from 'react'
import { Text } from '@chakra-ui/react'

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

export default Subhead
