import React from 'react'
import { Box, Flex, useColorModeValue, Divider } from '@chakra-ui/react'
import Logo from './logo'
import ThemeToggle from './theme-toggle'

const Navbar = () => {
  return (
    <Box p="8" bg={useColorModeValue('gray.800', 'gray.800')} as="nav">
      <Flex maxW="7xl" mx="auto" justifyContent="space-between">
        <Logo size={40} />
        <ThemeToggle />
      </Flex>
    </Box>
  )
}
export default Navbar
