import React, { Dispatch, SetStateAction } from 'react'
import {
  Box,
  Center,
  Heading,
  Portal,
  Text,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react'
import { FaUpload } from 'react-icons/fa'

import { AppData } from '../../types'
import { util } from '../utils/upload'

interface DropZoneTargetProps {
  setDropzone: Dispatch<SetStateAction<boolean>>
  setData: Dispatch<SetStateAction<AppData>>
}

const DropZoneTarget = ({ setDropzone, setData }: DropZoneTargetProps) => {
  const subduedText = useToken('colors', ['gray.700'])
  const lightThemeOutline = useToken('colors', ['gray.400'])
  const darkThemeOutline = useToken('colors', ['gray.500'])
  const outlineColor = useColorModeValue(lightThemeOutline, darkThemeOutline)

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation()
    event.preventDefault()
    setTimeout(setDropzone, 200, false)
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.stopPropagation()
    setDropzone(false)

    util
      .handleDrop(event)
      .then((result) => {
        setData((prevData) => {
          if (prevData instanceof Array) {
            const newArray = [...prevData]
            newArray[0].unshift(...result)
            return newArray
          } else {
            return [result]
          }
        })
      })
      .catch(() => {})
  }

  return (
    <Portal>
      <Box
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        position="fixed"
        top="12px"
        left="12px"
        right="12px"
        bottom="12px"
        backgroundColor="rgba(255,255,255,.95)"
        borderRadius="lg"
        zIndex={100}
        outline={`2px dashed ${outlineColor}`}
      >
        <Center
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
        >
          <FaUpload size="48" color={subduedText} />
          <Heading as="h1" margin="24px 0 20px">
            Drop SVGs
          </Heading>
          <Text color={subduedText}>
            Drop SVG files here to upload for processing
          </Text>
        </Center>
      </Box>
    </Portal>
  )
}

export default DropZoneTarget
