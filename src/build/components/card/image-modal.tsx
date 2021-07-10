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
  Select,
  Box,
  Center,
  Text,
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
  const [multiplier, setMultiplier] = React.useState(1)

  const state = new SVGImage(svgString, height, width)

  return (
    <Modal isOpen onClose={() => callback(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export PNG</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center width="100%" height="100%">
            <Center
              padding={8}
              maxWidth="360px"
              maxHeight="360px"
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
          <Center marginBottom={4}>
            <Text fontWeight="bold" marginRight={2}>
              Exported size:
            </Text>
            <Text>
              {Number(state.width) * multiplier} x{' '}
              {Number(state.height) * multiplier}
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Select
            marginRight={2}
            width="auto"
            flex={1}
            defaultValue={1}
            onChange={(event) => {
              setMultiplier(Number(event.target.value))
            }}
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
            <option value={4}>4x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
          </Select>
          <Button
            colorScheme="red"
            onClick={() => {
              state.setSvgElementWidthHeight(multiplier)
              state.createImgSrc()
              handle.exportPNG(
                state.htmlImageElementSrc,
                state.width,
                state.height
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
