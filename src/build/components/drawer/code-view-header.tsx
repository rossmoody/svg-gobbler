import React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  DarkMode,
  Flex,
  Text,
} from '@chakra-ui/react'
import prettyBytes from 'pretty-bytes'

import loc from '../utils/localization'

const getStringSize = (string: string) => {
  const bytes = new Blob([string]).size
  return prettyBytes(bytes)
}

interface CodeViewHeaderProps {
  originalString: string
  newString: string
  isReact: boolean
  setIsReact: React.Dispatch<React.SetStateAction<boolean>>
}

function CodeViewHeader({
  originalString,
  newString,
  isReact,
  setIsReact,
}: CodeViewHeaderProps) {
  const originalSize = getStringSize(originalString)
  const newSize = getStringSize(newString)

  const sizeString =
    originalSize === newSize ? originalSize : `${originalSize} -> ${newSize}`

  return (
    <Flex justifyContent="space-between" py="4" px="6" alignItems="center">
      <DarkMode>
        <Box>
          <ButtonGroup isAttached>
            <Button
              size="xs"
              isActive={!isReact}
              onClick={() => setIsReact(false)}
              variant="outline"
            >
              {loc('drawer_svg')}
            </Button>
            <Button
              size="xs"
              isActive={isReact}
              onClick={() => setIsReact(true)}
              variant="outline"
            >
              {loc('drawer_react')}
            </Button>
          </ButtonGroup>
        </Box>
      </DarkMode>
      <Text color="gray.400" fontSize="12px">
        {!isReact && sizeString}
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
        {loc('drawer_copy')}
      </Button>
    </Flex>
  )
}

export { CodeViewHeader }
