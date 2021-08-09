import React, { useState, useRef } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
} from '@chakra-ui/react'

interface PopoverFormTypes {
  title: string
  svgString: string
  download: (svg: string, filename: string) => void
  callback: (arg: boolean) => void
}

const FilenameModal = ({
  title,
  svgString,
  callback,
  download,
}: PopoverFormTypes) => {
  const [filename, setFilename] = useState('svg-gobbler')
  const firstFieldRef = useRef(null)

  return (
    <Modal
      size="xs"
      isOpen
      onClose={() => callback(false)}
      initialFocusRef={firstFieldRef}
      isCentered
    >
      <ModalOverlay />
      <form
        onSubmit={() => {
          download(svgString, filename)
          callback(false)
        }}
      >
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="filename">Filename</FormLabel>
              <InputGroup>
                <Input
                  id="filename"
                  ref={firstFieldRef}
                  defaultValue={filename}
                  onChange={(event) => setFilename(event.target.value)}
                />
                <InputRightAddon>.svg</InputRightAddon>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" isFullWidth type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default FilenameModal
