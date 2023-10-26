import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Logo from './logo'

const Navbar = () => (
  <Box p="8" bg={useColorModeValue('gray.800', 'gray.800')} as="nav">
    <Flex maxW="7xl" mx="auto" justifyContent="space-between">
      <Logo />
    </Flex>
  </Box>
)
export default Navbar
