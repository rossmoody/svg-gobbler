import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  Flex,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React from 'react'

import { AppData } from '../../layout'
import { handle } from '../utils/actions'

interface ToolbarData {
  data: AppData
}

function isPlural(num: number): string {
  return num === 1 ? '' : 's'
}

function getRefAddress(data: AppData) {
  const location = data instanceof Array && data[0].location
  return location ? location : 'Dashboard'
}

function getSvgQuantity(data: AppData) {
  const quantity = data instanceof Array && data.length
  return quantity ? quantity : 0
}

function getSvgStrings(data: AppData) {
  const svgStrings = data instanceof Array && data.map((svg) => svg.svgString!)
  return svgStrings ? svgStrings : ['']
}

const DataToolbar = ({ data }: ToolbarData) => {
  const moreThanOneString = getSvgStrings(data).length > 1

  return (
    <Box p="8" bg={mode('white', 'gray.800')} as="section">
      <Box maxW="7xl" mx="auto">
        <Stack
          spacing="5"
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
        >
          <Stack>
            <Flex alignItems="center">
              <Heading size="lg">{getRefAddress(data)}</Heading>
            </Flex>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              Showing {getSvgQuantity(data)} available SVG
              {isPlural(getSvgQuantity(data))}
            </Text>
          </Stack>

          <HStack
            justify="flex-end"
            flex="1"
            w={{ base: 'full', md: 'auto' }}
            spacing={{ base: '2', md: '4' }}
          >
            {moreThanOneString && (
              <Button
                size="lg"
                colorScheme="red"
                onClick={() => handle.downloadAllSVGs(getSvgStrings(data))}
              >
                Download all SVGs
              </Button>
            )}
          </HStack>
        </Stack>
      </Box>
    </Box>
  )
}

export default DataToolbar
