import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Copy, Download, Plus } from 'react-feather'
import { useData } from 'src/build/providers/data-provider'
import { useLocation } from '../../providers/location-provider'
import Tooltip from '../generic/tooltip'
import PasteModal from '../modals/paste-modal'
import handle from '../utils/actions'
import loc from '../utils/localization'
import { util } from '../utils/upload'

const DataToolbar = () => {
  const { data, setData } = useData()
  const { location } = useLocation()
  const [pasteModal, setPasteModal] = useState(false)

  const moreThanOneString = util.getSvgStrings(data).length > 1

  return (
    <Box p="8" bg={useColorModeValue('white', 'gray.800')} as="section">
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
            <Text
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize="sm"
            >
              {util.getSvgQuantity(data)} {loc('toolbar_qty')}
              {util.isPlural(util.getSvgQuantity(data))}
            </Text>
          </Stack>

          <HStack
            justify="flex-end"
            flex="1"
            w={{ base: 'full', md: 'auto' }}
            spacing={{ base: '2', md: '4' }}
          >
            <Input
              multiple
              type="file"
              id="upload"
              display="none"
              accept="image/svg+xml"
              onChange={(event) => {
                util.handleUpload(event).then((result) => {
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
              }}
            />
            <Tooltip label={loc('toolbar_tooltip')}>
              <Button
                leftIcon={<Plus size={24} />}
                size="lg"
                onClick={util.handleUploadClick}
              >
                {loc('toolbar_upload')}
              </Button>
            </Tooltip>
            <Button
              leftIcon={<Copy size={24} />}
              size="lg"
              onClick={() => setPasteModal(true)}
            >
              {loc('toolbar_paste')}
            </Button>
            {moreThanOneString && (
              <Button
                leftIcon={<Download size={24} />}
                size="lg"
                colorScheme="red"
                onClick={() => handle.downloadAllSVGs(util.getSvgStrings(data))}
              >
                {loc('toolbar_download')}
              </Button>
            )}
          </HStack>
        </Stack>
      </Box>

      <PasteModal callback={setPasteModal} showModal={pasteModal} />
    </Box>
  )
}

export default DataToolbar
