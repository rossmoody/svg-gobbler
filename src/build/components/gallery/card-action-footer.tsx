import React from 'react'
import {
  Button,
  Grid,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
  MenuDivider,
  MenuGroup,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'

import { handle } from '../utils/actions'

import ImageModal from './image-modal'

interface CardActionFooter {
  svgString: string
}

const CardActionFooter = ({ svgString }: CardActionFooter) => {
  const toast = useToast({
    status: 'success',
    duration: 3000,
    isClosable: true,
  })

  return (
    <Grid
      position="absolute"
      templateColumns="3fr 2fr 1fr"
      gap={1}
      top="12px"
      bottom={0}
      left={0}
      right={0}
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Button
        onClick={() => {
          handle.downloadOriginal(svgString)
          toast({
            title: 'Download successful',
            description: 'The SVG is downloading now.',
          })
        }}
      >
        Download
      </Button>
      <Button
        onClick={() => {
          handle.copyToClipboard(svgString)
          toast({
            title: 'Copied to clipboard',
            description:
              'The SVG has been copied to your clipboard and is ready to be pasted.',
          })
        }}
      >
        Copy
      </Button>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FaChevronDown />}
          aria-label="Options"
          borderRadius="md"
        />
        <MenuList>
          <MenuGroup title="Optimized SVG">
            <MenuItem
              onClick={() => {
                handle.downloadOptimized(svgString)
                toast({
                  title: 'Download successful',
                  description:
                    'The SVG has been successfully optimized using SVGO and is downloading now.',
                })
              }}
            >
              Download
            </MenuItem>
            <MenuItem
              onClick={() => {
                handle.copyOptimized(svgString)
                toast({
                  title: 'Copied to clipboard',
                  description:
                    'The SVG has been successfully optimized using SVGO and is available in your clipboard.',
                })
              }}
            >
              Copy to clipboard
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup defaultValue="asc" title="Image" type="radio">
            <ImageModal svgString={svgString} />
          </MenuGroup>
        </MenuList>
      </Menu>
    </Grid>
  )
}

export default CardActionFooter
