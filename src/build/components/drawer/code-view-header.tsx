import {
  Box,
  Button,
  ButtonGroup,
  DarkMode,
  Flex,
  Text,
} from '@chakra-ui/react'
import prettyBytes from 'pretty-bytes'
import React from 'react'
import { useOptions } from 'src/build/providers/options-provider'
import loc from '../utils/localization'

type Props = {
  svgString: string
  newSvgString: string
}

function CodeViewHeader({ svgString, newSvgString }: Props) {
  const { options, setOptions } = useOptions()

  const originalSize = getStringSize(svgString)
  const newSize = getStringSize(newSvgString)
  const sizeString =
    originalSize === newSize ? originalSize : `${originalSize} -> ${newSize}`

  return (
    <Flex justifyContent="space-between" py="4" px="6" alignItems="center">
      <DarkMode>
        <Box>
          <ButtonGroup isAttached>
            <Button
              size="xs"
              isActive={!options.react}
              onClick={() =>
                setOptions((prevOptions) => ({ ...prevOptions, react: false }))
              }
              variant="outline"
            >
              {loc('drawer_svg')}
            </Button>
            <Button
              size="xs"
              isActive={options.react}
              onClick={() =>
                setOptions((prevOptions) => ({ ...prevOptions, react: true }))
              }
              variant="outline"
            >
              {loc('drawer_react')}
            </Button>
          </ButtonGroup>
        </Box>
      </DarkMode>
      <Text color="gray.400" fontSize="12px">
        {!options.react && sizeString}
      </Text>
      <Button
        size="xs"
        onClick={(event) => {
          navigator.clipboard.writeText(newSvgString)
          const target = event.target as HTMLButtonElement
          target.textContent = 'Copied'
          setTimeout(() => {
            target.textContent = 'Copy'
          }, 1500)
        }}
      >
        {loc('drawer_copy')}
      </Button>
    </Flex>
  )
}

function getStringSize(string: string) {
  const bytes = new Blob([string]).size
  return prettyBytes(bytes)
}

export { CodeViewHeader }
