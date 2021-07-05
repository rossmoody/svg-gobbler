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
  MenuItem,
  Select,
  Box,
  Center,
} from '@chakra-ui/react'

import { SVGImage } from '../utils/image-class'
import { handle } from '../utils/actions'

interface ImageModalProps {
  svgString: string
}

const ImageModal = ({ svgString }: ImageModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const imageClass = new SVGImage(svgString)
  console.log(imageClass)

  return (
    <>
      <MenuItem onClick={() => setIsOpen(true)}>Export as PNG</MenuItem>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export PNG</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center padding={8}>
              <Box as="img" src={imageClass.htmlImageElementSrc} />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Select placeholder="Select size" marginRight={2} width="auto">
              <option value="option1">1x</option>
              <option value="option2">2x</option>
              <option value="option3">3x</option>
            </Select>
            <Button
              colorScheme="red"
              onClick={() => {
                handle.exportPNG(
                  imageClass.htmlImageElementSrc,
                  Number(imageClass.width),
                  Number(imageClass.height)
                )
              }}
            >
              Export PNG
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImageModal
