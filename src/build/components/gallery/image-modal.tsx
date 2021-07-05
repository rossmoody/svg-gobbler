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

import { SVGImage } from '../utils/export-image'

interface ImageModalProps {
  svgString: string
}

const ImageModal = ({ svgString }: ImageModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const svg = new SVGImage(svgString)

  if (!svg.svgElement.hasAttribute('viewBox')) console.log(svg)

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
              <Box as="img" src={svg.htmlImageElementSrc} />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Select placeholder="Select size" marginRight={2} width="auto">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Button colorScheme="red">Export PNG</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImageModal
