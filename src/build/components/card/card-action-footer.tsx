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
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import {
  FiChevronDown,
  FiCode,
  FiImage,
  FiDownload,
  FiCopy,
} from 'react-icons/fi'

import Drawer from '../drawer'
import { handle } from '../utils/actions'

import ImageModal from './image-modal'

interface CardActionFooter {
  svgString: string
  height: number
  width: number
}

const CardActionFooter = ({ svgString, height, width }: CardActionFooter) => {
  const [showModal, setShowModal] = React.useState(false)
  const [showDrawer, setShowDrawer] = React.useState(false)

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
      <Menu placement="top">
        <MenuButton
          as={IconButton}
          icon={<FiChevronDown />}
          aria-label="Options"
          borderRadius="md"
        />
        <MenuList>
          <MenuItem
            icon={<FiDownload />}
            onClick={() => {
              handle.downloadOptimized(svgString)
              toast({
                title: 'Download successful',
                description:
                  "The SVG has been successfully optimized using SVGO's default settings and is downloading now.",
              })
            }}
          >
            Download optimized
          </MenuItem>
          <MenuItem
            icon={<FiCopy />}
            onClick={() => {
              handle.copyOptimized(svgString)
              toast({
                title: 'Copied to clipboard',
                description:
                  "The SVG has been successfully optimized using SVGO's default settings and is available in your clipboard.",
              })
            }}
          >
            Copy optimized
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<FiImage />} onClick={() => setShowModal(true)}>
            Export as PNG…
          </MenuItem>
          {showModal && (
            <ImageModal
              callback={setShowModal}
              svgString={svgString}
              height={height}
              width={width}
            />
          )}
          <MenuDivider />
          <MenuItem icon={<FiCode />} onClick={() => setShowDrawer(true)}>
            View code…
          </MenuItem>
          {showDrawer && (
            <Drawer svgString={svgString} callback={setShowDrawer} />
          )}
        </MenuList>
      </Menu>
    </Grid>
  )
}

export default CardActionFooter
