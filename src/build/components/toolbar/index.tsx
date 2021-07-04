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
import { handle } from '../utils/actions'
import LoadingToolbar from './loading-toolbar'
import { AppData } from '../../layout'
import React from 'react'

function isPlural(num: number): string {
  return num === 1 ? '' : 's'
}

interface ToolbarData {
  data: AppData
}

const Toolbar = ({ data }: ToolbarData) => {
  if (!data) return <LoadingToolbar />

  const refAddress: string = data[0].location || ''
  const svgQuantity: number = data.length
  const svgStrings: string[] = data.map((svg) => svg.svgString)

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
              <Heading size="lg">{refAddress}</Heading>
            </Flex>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              Showing {svgQuantity} available SVG{isPlural(svgQuantity)}
            </Text>
          </Stack>

          <HStack
            justify="flex-end"
            flex="1"
            w={{ base: 'full', md: 'auto' }}
            spacing={{ base: '2', md: '4' }}
          >
            <Button
              size="lg"
              colorScheme="red"
              onClick={() => handle.downloadAllSVGs(svgStrings)}
            >
              Download all SVGs
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Box>
  )
}

export default Toolbar