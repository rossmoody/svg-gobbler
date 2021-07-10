import React from 'react'
import { Text } from '@chakra-ui/react'

const Body: React.FC = ({ children }) => (
  <Text fontSize="xl" fontWeight="medium" lineHeight="1.25">
    {children}
  </Text>
)

export default Body
