import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import handle from '../utils/actions'
import loc from '../utils/localization'

interface ImageModalProps {
  callback: React.Dispatch<React.SetStateAction<boolean>>
  svgString: string
  height: number
  width: number
  whiteFill: boolean
  showModal: boolean
}

const ImageModal = ({
  callback,
  svgString,
  height,
  width,
  whiteFill,
  showModal,
}: ImageModalProps) => {
  const [size, setSize] = useState({ height, width })
  const [filename, setFilename] = useState('svg-image')
  const firstFieldRef = useRef(null)

  const whiteFillBg = useColorModeValue('gray.100', 'null')

  return (
    <Modal
      isOpen={showModal}
      onClose={() => callback(false)}
      size="lg"
      initialFocusRef={firstFieldRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{loc('modals_exportImage')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody marginBottom={4}>
          <Center width="100%" height="100%" position="relative">
            <Center
              padding={8}
              maxWidth="280px"
              maxHeight="280px"
              width="100%"
              height="100%"
              marginBottom={4}
            >
              <Box
                position="relative"
                height="0"
                width="100%"
                padding="0 0 100%"
                dangerouslySetInnerHTML={{ __html: svgString }}
                overflow="hidden"
                zIndex={1}
                sx={{
                  '& > svg': {
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0',
                    overflow: 'visible',
                  },
                  '& > img': {
                    width: '100%',
                  },
                }}
              />
            </Center>
            {whiteFill && (
              <Box
                bg={whiteFillBg}
                borderRadius="lg"
                position="absolute"
                width="100%"
                height="100%"
              />
            )}
          </Center>
        </ModalBody>

        <ModalFooter flexDir="column" alignItems="flex-start">
          <FormControl>
            <HStack>
              <FormLabel margin={0} fontSize="sm" htmlFor="height">
                {loc('modals_height')}
                <InputGroup>
                  <Input
                    ref={firstFieldRef}
                    type="number"
                    value={size.height}
                    id="height"
                    onChange={(event) => {
                      let newHeight = Number(event.target.value)
                      if (!newHeight || newHeight < 1) newHeight = 1

                      const newWidth = Math.ceil(
                        (size.width / size.height) * newHeight
                      )
                      setSize({ height: newHeight, width: newWidth })
                    }}
                  />
                  <InputRightAddon children={loc('modals_px')} />
                </InputGroup>
              </FormLabel>
              <FormLabel fontSize="sm" htmlFor="width">
                {loc('modals_width')}
                <InputGroup>
                  <Input
                    id="width"
                    type="number"
                    value={size.width}
                    onChange={(event) => {
                      let newWidth = Number(event.target.value)
                      if (!newWidth || newWidth < 1) newWidth = 1
                      const newHeight = Math.ceil(
                        (size.height / size.width) * newWidth
                      )
                      setSize({ height: newHeight, width: newWidth })
                    }}
                  />
                  <InputRightAddon children={loc('modals_px')} />
                </InputGroup>
              </FormLabel>
            </HStack>
          </FormControl>
          <FormControl marginTop={4}>
            <FormLabel htmlFor="image-filename" fontSize="sm">
              {loc('modals_filename')}
            </FormLabel>
            <InputGroup>
              <Input
                id="image-filename"
                defaultValue={filename}
                onChange={(event) => setFilename(event.target.value)}
              />
              <InputRightAddon>{loc('modals_fileType_png')}</InputRightAddon>
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="red"
            marginBottom={4}
            marginTop={8}
            isFullWidth
            onClick={() => {
              handle.exportPNG(svgString, size.width, size.height, filename)
            }}
          >
            {loc('modals_exportImage')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageModal
