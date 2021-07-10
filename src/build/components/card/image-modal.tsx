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
  FormControl,
  FormLabel,
  Box,
  Center,
  InputRightAddon,
  Input,
  HStack,
  InputGroup,
} from '@chakra-ui/react'

import { SVGImage } from '../utils/image-class'
import { handle } from '../utils/actions'

interface ImageModalProps {
  callback: (arg: boolean) => void
  svgString: string
  height: number
  width: number
}

const ImageModal = ({
  callback,
  svgString,
  height,
  width,
}: ImageModalProps) => {
  const [size, setSize] = React.useState({ height, width })

  const state = new SVGImage(svgString, height, width)

  return (
    <Modal isOpen onClose={() => callback(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export PNG</ModalHeader>
        <ModalCloseButton />
        <ModalBody marginBottom={4}>
          <Center width="100%" height="100%">
            <Center
              padding={8}
              maxWidth="360px"
              maxHeight="260px"
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
              />
            </Center>
          </Center>
        </ModalBody>

        <ModalFooter>
          <FormControl>
            <HStack marginBottom={5}>
              <FormLabel margin={0}>
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
              <FormLabel>
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

            <Button
              colorScheme="red"
              marginBottom={4}
              isFullWidth
              onClick={() => {
                state.setClassWidthHeight(size.height, size.width)
                state.setSvgElementWidthHeight()
                state.createImgSrc()
                handle.exportPNG(
                  state.htmlImageElementSrc,
                  size.width,
                  size.height
                )
              }}
            >
              Export PNG
            </Button>
          </FormControl>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageModal
