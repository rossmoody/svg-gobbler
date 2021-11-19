import React from 'react'
import { Box, Flex, useColorModeValue, Button } from '@chakra-ui/react'
import { FeedbackFish } from '@feedback-fish/react'

import loc from '../utils/localization'
import { useLocation } from '../../providers/location-provider'
import { useData } from '../../providers/data-provider'

import Logo from './logo'
import ThemeToggle from './theme-toggle'

const Navbar = () => {
  const { location } = useLocation()
  const { data } = useData()

  const stringData = JSON.stringify(data)

  return (
    <Box p="8" bg={useColorModeValue('gray.800', 'gray.800')} as="nav">
      <Flex maxW="7xl" mx="auto" justifyContent="space-between">
        <Logo size={40} />
        <Flex>
          <FeedbackFish
            projectId="cc5d44e3563b88"
            metadata={{ data: stringData, location }}
          >
            <Button marginRight={4}>{loc('nav_fb')}</Button>
          </FeedbackFish>
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  )
}
export default Navbar
