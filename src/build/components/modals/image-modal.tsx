/* eslint-disable react/no-children-prop */
import React, { useRef, useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Box,
  Center,
  InputRightAddon,
  Input,
  HStack,
  InputGroup,
  useColorModeValue,
  FormControl,
} from '@chakra-ui/react'

import handle from '../utils/actions'
import { SVGImage } from '../utils/image-class'
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

  const state = new SVGImage(svgString, height, width)
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
              stroke="red.100"
              marginBottom={4}
            >
              <Box
                as="img"
                src={state.base64}
                width="100%"
                height="100%"
                zIndex={1}
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
          <form
            onSubmit={(event) => {
              event.preventDefault()
              state.setClassWidthHeight(size.height, size.width)
              state.setSvgElementWidthHeight()
              state.createImgSrc()
              handle.exportPNG(state.base64, size.width, size.height, filename)
            }}
          >
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
                        const value = Number(event.target.value)
                        const newHeight = value
                        const originalHeight = state.height
                        const originalWidth = state.width

                        const newWidth = Math.ceil(
                          (originalWidth / originalHeight) * newHeight
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
                        const value = Number(event.target.value)
                        const newWidth = value
                        const originalHeight = state.height
                        const originalWidth = state.width

                        const newHeight = Math.ceil(
                          (originalHeight / originalWidth) * newWidth
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
              type="submit"
            >
              {loc('modals_exportImage')}
            </Button>
          </form>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageModal
