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

import loc from '../utils/localization'

interface PopoverFormTypes {
  title: string
  svgString: string
  download: (svg: string, filename: string) => void
  callback: React.Dispatch<React.SetStateAction<boolean>>
  showModal: boolean
}

const FilenameModal = ({
  title,
  svgString,
  callback,
  download,
  showModal,
}: PopoverFormTypes) => {
  const [filename, setFilename] = useState('svg-gobbler')

  const firstFieldRef = useRef(null)

  return (
    <Modal
      size="xs"
      isOpen={showModal}
      onClose={() => callback(false)}
      initialFocusRef={firstFieldRef}
      isCentered
    >
      <ModalOverlay />
      <form
        onSubmit={(event) => {
          event.preventDefault()
          download(svgString, filename)
          callback(false)
        }}
      >
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="filename">{loc('modals_filename')}</FormLabel>
              <InputGroup>
                <Input
                  id="filename"
                  ref={firstFieldRef}
                  defaultValue={filename}
                  onChange={(event) => setFilename(event.target.value)}
                />
                <InputRightAddon>{loc('modals_fileType')}</InputRightAddon>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" isFullWidth type="submit">
              {loc('modals_save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default FilenameModal
