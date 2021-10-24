import React, { Dispatch, SetStateAction, useRef } from 'react'
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react'

import { AppData } from '../../types'
import loc from '../utils/localization'
import { util } from '../utils/upload'

interface PasteTypes {
  callback: Dispatch<SetStateAction<boolean>>
  showModal: boolean
  setData: Dispatch<SetStateAction<AppData>>
}

const PasteModal = ({ callback, showModal, setData }: PasteTypes) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const toast = useToast({
    status: 'error',
    duration: 7000,
    isClosable: true,
  })

  return (
    <Modal
      size="lg"
      isOpen={showModal}
      onClose={() => callback(false)}
      initialFocusRef={textAreaRef}
      isCentered
    >
      <ModalOverlay />
      <form
        onSubmit={(event) => {
          event.preventDefault()

          const value = textAreaRef.current!.value
          const newSvg = util.handlePaste(value)

          if (newSvg) {
            setData((prevData) => {
              if (prevData instanceof Array) {
                const newArray = [...prevData]
                newArray[0].unshift(newSvg)
                return newArray
              } else {
                return [[newSvg]]
              }
            })
          } else {
            toast({
              title: loc('modals_error_headline'),
              description: loc('modals_error_description'),
            })
          }

          callback(false)
        }}
      >
        <ModalContent>
          <ModalHeader>{loc('modals_paste_headline')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <Textarea
                ref={textAreaRef}
                placeholder="Paste your SVG code here..."
              />
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

export default PasteModal
