import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  Flex,
  useColorModeValue as mode,
  Input,
} from '@chakra-ui/react'
import React from 'react'
import { FaDownload, FaPlus } from 'react-icons/fa'

import { AppData } from '../../types'
import { handle } from '../utils/actions'
import { util } from '../utils/upload'
import { Tooltip } from '..'

interface ToolbarData {
  data: AppData
  setData: React.Dispatch<React.SetStateAction<AppData>>
  location: string
}

const DataToolbar = ({ data, setData, location }: ToolbarData) => {
  const moreThanOneString = util.getSvgStrings(data).length > 1

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
              <Heading size="lg">{location}</Heading>
            </Flex>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              Showing {util.getSvgQuantity(data)} available SVG
              {util.isPlural(util.getSvgQuantity(data))}
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
                leftIcon={<FaDownload />}
                size="lg"
                colorScheme="red"
                onClick={() => handle.downloadAllSVGs(util.getSvgStrings(data))}
              >
                Download all
              </Button>
            )}
            <Input
              multiple
              type="file"
              id="upload"
              display="none"
              accept="image/svg+xml"
              onChange={(event) => {
                util
                  .handleUpload(event)
                  .then((result) => {
                    setData((prevData) => {
                      if (prevData instanceof Array) {
                        const newArray = [...prevData]
                        newArray[0].unshift(...result)
                        return newArray
                      } else {
                        return [result]
                      }
                    })
                  })
                  .catch(() => {})
              }}
            />
            <Tooltip label="You can also drag SVGs anywhere on this page to upload">
              <Button
                leftIcon={<FaPlus />}
                size="lg"
                onClick={util.handleUploadClick}
              >
                Upload
              </Button>
            </Tooltip>
          </HStack>
        </Stack>
      </Box>
    </Box>
  )
}

export default DataToolbar
