/* eslint-disable react/no-children-prop */
import React from 'react'
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
  Text,
  useColorModeValue,
  FormControl,
} from '@chakra-ui/react'

import handle from '../utils/actions'
import { SVGImage } from '../utils/image-class'

interface ImageModalProps {
  callback: (arg: boolean) => void
  svgString: string
  height: number
  width: number
  whiteFill: boolean
}

const ImageModal = ({
  callback,
  svgString,
  height,
  width,
  whiteFill,
}: ImageModalProps) => {
  const [size, setSize] = React.useState({ height, width })
  const [filename, setFilename] = React.useState('svg-image')

  const state = new SVGImage(svgString, height, width)
  const whiteFillBg = useColorModeValue('gray.100', 'null')

  return (
    <Modal isOpen onClose={() => callback(false)} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export image</ModalHeader>
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
                src={state.htmlImageElementSrc}
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
          <Box marginBottom={5}>
            <Text fontWeight="semibold">Configure</Text>
            <Text
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize="sm"
            >
              Specify height, width, or filename before export. The SVG will
              proportionally resize based on height or width.
            </Text>
          </Box>

          <FormControl>
            <HStack>
              <FormLabel margin={0} fontSize="sm">
                Height
                <InputGroup>
                  <Input
                    type="number"
                    value={size.height}
                    onChange={(event) => {
                      const value = Number(event.target.value)
                      if (!value) {
                        setTimeout(() => {
                          event.target.select()
                        }, 100)
                      }

                      const newHeight = value
                      const originalHeight = state.height
                      const originalWidth = state.width

                      const newWidth = Math.ceil(
                        (originalWidth / originalHeight) * newHeight
                      )

                      setSize({ height: newHeight, width: newWidth })
                    }}
                  />
                  <InputRightAddon children="px" />
                </InputGroup>
              </FormLabel>
              <FormLabel fontSize="sm">
                Width
                <InputGroup>
                  <Input
                    type="number"
                    value={size.width}
                    onChange={(event) => {
                      const value = Number(event.target.value)

                      if (!value) {
                        setTimeout(() => {
                          event.target.select()
                        }, 100)
                      }

                      const newWidth = value
                      const originalHeight = state.height
                      const originalWidth = state.width

                      const newHeight = Math.ceil(
                        (originalHeight / originalWidth) * newWidth
                      )

                      setSize({ height: newHeight, width: newWidth })
                    }}
                  />
                  <InputRightAddon children="px" />
                </InputGroup>
              </FormLabel>
            </HStack>
          </FormControl>
          <FormControl marginTop={4}>
            <FormLabel htmlFor="image-filename" fontSize="sm">
              Filename
            </FormLabel>
            <InputGroup>
              <Input
                id="image-filename"
                defaultValue={filename}
                onChange={(event) => setFilename(event.target.value)}
              />
              <InputRightAddon>.png</InputRightAddon>
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="red"
            marginBottom={4}
            marginTop={8}
            isFullWidth
            onClick={() => {
              state.setClassWidthHeight(size.height, size.width)
              state.setSvgElementWidthHeight()
              state.createImgSrc()
              handle.exportPNG(
                state.htmlImageElementSrc,
                size.width,
                size.height,
                filename
              )
            }}
          >
            Export PNG
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageModal
