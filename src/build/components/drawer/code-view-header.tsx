import React from 'react'
import { Button, Box, Flex, Text } from '@chakra-ui/react'
import prettyBytes from 'pretty-bytes'

const getStringSize = (string: string) => {
  const bytes = new Blob([string]).size
  return prettyBytes(bytes)
}

interface CodeViewHeaderProps {
  originalString: string
  newString: string
}

function CodeViewHeader({ originalString, newString }: CodeViewHeaderProps) {
  const originalSize = getStringSize(originalString)
  const newSize = getStringSize(newString)

  const sizeString =
    originalSize === newSize ? originalSize : `${originalSize} -> ${newSize}`

  return (
    <Flex justifyContent="space-between" p={3} alignItems="center">
      <Box w="32px" />
      <Text color="gray.400" fontSize="12px">
        {sizeString}
      </Text>
      <Button
        size="xs"
        onClick={(event) => {
          navigator.clipboard.writeText(newString)
          ;(event.target as HTMLButtonElement).textContent = 'Copied'

          setTimeout(() => {
            ;(event.target as HTMLButtonElement).textContent = 'Copy'
          }, 1500)
        }}
      >
        Copy
      </Button>
    </Flex>
  )
}

export { CodeViewHeader }
